import { raw } from './create-element.util';
import { configureFormElement } from './form-element.util';
import { createCSSStyleSheets } from './styling-element.util';
import { isFunction, isString } from './type-check.util';

type HTMLTags = keyof HTMLElementEventMap;

type WebComponentOptions<ComponentElement = HTMLElement> = {
  form?: boolean;
  observedAttributes?: string[];
  onAttributeChanged?: (name: string, prev: string, curr: string, el: WebComponent<ComponentElement>) => void;
  onConnected?: (el: WebComponent<ComponentElement>) => void;
  onDisconnected?: (el: WebComponent<ComponentElement>) => void;
  styles?: (CSSStyleSheet | string)[];
  template: ((el: WebComponent<ComponentElement>) => any) | string;
};

type WebComponentElement<ComponentElement = HTMLElement> = {
  event: (
    id: string | HTMLElement | ComponentElement,
    event: string | HTMLTags,
    callback: EventListener,
    options?: boolean | AddEventListenerOptions,
  ) => void;
  fire: (event: string | HTMLTags, options?: CustomEventInit) => void;
  ref: <T = HTMLElement>(id: string) => T;
  render: () => void;
  rootElement: ComponentElement;
  value?: string;
};

export type WebComponent<ComponentElement = HTMLElement> = ComponentElement & WebComponentElement<ComponentElement>;

export const component = <ComponentElement = HTMLElement>({
  form = false,
  observedAttributes = [],
  onAttributeChanged,
  onConnected,
  onDisconnected,
  styles,
  template,
}: WebComponentOptions<ComponentElement>) =>
  class extends HTMLElement implements WebComponentElement<ComponentElement> {
    static formAssociated = form;

    static get observedAttributes() {
      return observedAttributes;
    }

    private shadow = this.attachShadow({ mode: 'open' });

    private eventListeners: Array<{ callback: EventListener; element: HTMLElement; event: string }> = [];

    get rootElement() {
      return this.shadow.firstChild as ComponentElement;
    }

    get self() {
      return this as unknown as WebComponent<ComponentElement>;
    }

    constructor() {
      super();

      if (form) {
        configureFormElement(this as unknown as HTMLInputElement);
      }

      createCSSStyleSheets(styles).then((sheets) => {
        if (sheets) this.shadow.adoptedStyleSheets = sheets;
      });

      this.render();
    }

    connectedCallback() {
      if (onConnected) {
        onConnected(this.self);
      }

      // automatically sync observed attributes with properties
      observedAttributes
        .filter((attr) => !attr.match(/^data-*/))
        .forEach((attr) => {
          Object.defineProperty(this, attr, {
            get: () => this.getAttribute(attr),
            set: (value: string) => this.setAttribute(attr, value),
          });
        });
    }

    disconnectedCallback() {
      if (onDisconnected) {
        onDisconnected(this.self);
      }

      // clean up event listeners to prevent memory leaks
      this.eventListeners.forEach(({ callback, element, event }) => {
        element.removeEventListener(event, callback);
      });
      this.eventListeners = [];
    }

    attributeChangedCallback(name: string, prev: string, curr: string) {
      if (prev !== curr && onAttributeChanged) {
        onAttributeChanged(name, prev, curr, this.self);
      }
    }

    render() {
      const tmpl: string = isFunction(template) ? template(this.self) : template;
      const nodes: NodeListOf<ChildNode> = raw(tmpl);

      // only update changed elements instead of replacing everything
      if (this.shadow.childNodes.length === 0) {
        this.shadow.append(...nodes);
      } else {
        const oldNodes = Array.from(this.shadow.childNodes);

        for (let i = 0; i < Math.max(oldNodes.length, nodes.length); i++) {
          const oldNode = oldNodes[i];
          const newNode = nodes[i];

          if (!newNode) {
            this.shadow.removeChild(oldNode);
          } else if (!oldNode) {
            this.shadow.appendChild(newNode);
          } else if (!oldNode.isEqualNode(newNode)) {
            this.shadow.replaceChild(newNode, oldNode);
          }
        }
      }
    }

    fire(event: string | HTMLTags, options?: CustomEventInit) {
      this.dispatchEvent(new CustomEvent(event, options));
    }

    event(
      id: string | HTMLElement | ComponentElement,
      event: string | HTMLTags,
      callback: EventListener,
      options?: boolean | AddEventListenerOptions,
    ) {
      const el = (isString(id) ? this.ref(`${id}`) : id) as HTMLElement;

      if (el) {
        el.addEventListener(event, callback, options);
        this.eventListeners.push({ callback, element: el, event });
      } else {
        console.warn(`Element with id ${id} not found.`);
      }
    }

    ref<T = HTMLElement>(id: string): T {
      return this.shadowRoot?.getElementById(id) as T;
    }
  };

export const define = <ComponentElement = HTMLElement>(
  name: string,
  options: WebComponentOptions<ComponentElement>,
) => {
  if (!window.customElements.get(name)) window.customElements.define(name, component<ComponentElement>(options));
};

export { classMap } from './styling-element.util';
