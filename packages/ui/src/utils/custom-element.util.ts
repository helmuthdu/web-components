import { raw } from './create-element.util';
import { configureFormElement } from './form-element.util';
import { loadCSSStyleSheets } from './styling-element.util';
import { isFunction, isString } from './type-check.util';

type HTMLTags = keyof HTMLElementEventMap;

type WebComponentOptions<T extends HTMLElement = HTMLElement> = {
  form?: boolean;
  observedAttributes?: readonly string[];
  onAttributeChanged?: (name: string, prev: string | null, curr: string | null, el: WebComponent<T>) => void;
  onConnected?: (el: WebComponent<T>) => void;
  onDisconnected?: (el: WebComponent<T>) => void;
  styles?: (CSSStyleSheet | string)[];
  template: ((el: WebComponent<T>) => string) | string;
};

type WebComponentElement<T extends HTMLElement = HTMLElement> = {
  event: (
    id: string | HTMLElement | T,
    event: string | HTMLTags,
    callback: EventListener,
    options?: AddEventListenerOptions,
  ) => void;
  fire: (event: string | HTMLTags, options?: CustomEventInit) => void;
  ref: <U extends HTMLElement = HTMLElement>(id: string) => U | null;
  render: () => void;
  readonly rootElement: T;
  value?: string;
};

export type WebComponent<T extends HTMLElement = HTMLElement> = T & WebComponentElement<T>;

export const component = <T extends HTMLElement = HTMLElement>({
  form = false,
  observedAttributes = [],
  onAttributeChanged,
  onConnected,
  onDisconnected,
  styles,
  template,
}: WebComponentOptions<T>) =>
  class extends HTMLElement implements WebComponentElement<T> {
    static formAssociated = form;

    static get observedAttributes() {
      return observedAttributes;
    }

    private static defineObservedAttributes(attributes: readonly string[], target: any) {
      attributes
        .filter((attr) => !attr.startsWith('data-'))
        .forEach((attr) => {
          Object.defineProperty(target.prototype, attr, {
            get() {
              return this.getAttribute(attr);
            },
            set(value: string) {
              this.setAttribute(attr, value);
            },
          });
        });
    }

    static {
      this.defineObservedAttributes(observedAttributes, this);
    }

    private readonly shadow = this.attachShadow({ mode: 'open' });

    private readonly controller = new AbortController();

    get rootElement(): T {
      return this.shadow.firstElementChild as T;
    }

    get self() {
      return this as unknown as WebComponent<T>;
    }

    constructor() {
      super();

      if (form) {
        configureFormElement(this as unknown as HTMLInputElement);
      }

      loadCSSStyleSheets(styles).then((sheets) => {
        if (sheets) this.shadow.adoptedStyleSheets = sheets;
      });

      this.render();
    }

    connectedCallback() {
      if (onConnected) {
        onConnected(this.self);
      }
    }

    disconnectedCallback() {
      if (onDisconnected) {
        onDisconnected(this.self);
      }

      this.controller.abort();
    }

    attributeChangedCallback(name: string, prev: string, curr: string) {
      if (prev !== curr && onAttributeChanged) {
        onAttributeChanged(name, prev, curr, this.self);
      }
    }

    render(): void {
      requestAnimationFrame(() => {
        const tmpl: string = isFunction(template) ? template(this.self) : template;
        const newNodes: NodeListOf<ChildNode> = raw(tmpl);

        if (!this.shadow.hasChildNodes()) {
          this.shadow.append(...newNodes);

          return;
        }

        const oldNodes = Array.from(this.shadow.childNodes);

        oldNodes.forEach((oldNode, index) => {
          const newNode = newNodes[index];

          if (!newNode) {
            oldNode.remove();
          } else if (!oldNode.isEqualNode(newNode)) {
            oldNode.replaceWith(newNode);
          }
        });

        // Append remaining new nodes
        for (let i = oldNodes.length; i < newNodes.length; i++) {
          this.shadow.appendChild(newNodes[i]);
        }
      });
    }

    fire(event: string | HTMLTags, options?: CustomEventInit) {
      this.dispatchEvent(new CustomEvent(event, options));
    }

    event(
      id: string | HTMLElement | T,
      event: string | HTMLTags,
      callback: EventListener,
      options?: AddEventListenerOptions,
    ) {
      const el = (isString(id) ? this.ref(`${id}`) : id) as HTMLElement;

      if (el) {
        el.addEventListener(event, callback, { ...options, signal: this.controller.signal });
      } else {
        console.warn(`Element with id ${id} not found.`);
      }
    }

    ref<U extends HTMLElement = HTMLElement>(id: string): U | null {
      return this.shadowRoot?.getElementById(id) as U | null;
    }
  };

export const define = <T extends HTMLElement = HTMLElement>(name: string, options: WebComponentOptions<T>): void => {
  if (!customElements.get(name)) {
    customElements.define(name, component<T>(options));
  }
};

export { classMap } from './styling-element.util';
