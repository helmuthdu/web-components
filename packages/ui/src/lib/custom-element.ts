import { configureFormElement } from './form-element';
import { isArray, isFunction, isString } from './utils';

type HTMLTags = keyof HTMLElementEventMap;

type CustomElementProps = Record<string, any> | undefined;

type CustomElementOptions<Props extends CustomElementProps, ComponentElement = HTMLElement> = {
  form?: boolean;
  onAttributeChanged?: (name: string, prev: string, curr: string, self: CustomElement<Props, ComponentElement>) => void;
  onConnected?: (self: CustomElement<Props, ComponentElement>) => void;
  onDisconnected?: (self: CustomElement<Props, ComponentElement>) => void;
  props?: Props & Partial<Omit<ComponentElement, keyof Props>>;
  template: (self: CustomElement<Props, ComponentElement>) => any | string;
};

type CustomElementClass<Props extends CustomElementProps, ComponentElement = HTMLElement> = {
  event: (
    id: string | HTMLElement | CustomElement<Props, ComponentElement>,
    event: string | HTMLTags,
    callback: EventListener,
    options?: boolean | AddEventListenerOptions
  ) => void;
  fire: (event: string | HTMLTags, options?: CustomEventInit) => void;
  node: ComponentElement;
  ref: <T = HTMLElement>(id: string) => T;
  render: () => void;
  rootElement: CustomElement<Props, ComponentElement>;
  value?: string;
};

export type CustomElement<Props extends CustomElementProps, ComponentElement = HTMLElement> = Omit<
  ComponentElement,
  keyof Props
> &
  Props &
  CustomElementClass<Props, ComponentElement>;

const getAttrName = (prop: string) => prop.replace(/([A-Z])/g, '-$1').toLowerCase();

export const component = <Props extends CustomElementProps, ComponentElement = HTMLElement>({
  form = false,
  onAttributeChanged,
  onConnected,
  onDisconnected,
  props = {} as any,
  template
}: CustomElementOptions<Props, ComponentElement>) =>
  class extends HTMLElement implements CustomElementClass<Props, ComponentElement> {
    node = this as unknown as ComponentElement;

    private get self(): CustomElement<Props, ComponentElement> {
      return new Proxy(this, {
        get(target, key) {
          const value = Reflect.get(target, key) as any;
          return isFunction(value)
            ? value.bind(target)
            : key === 'dataset'
              ? Object.entries(props.dataset).reduce(
                  (acc, [k, v]) => ({ ...acc, [k]: acc[k] === '' ? true : (acc[k] ?? v) }),
                  value
                )
              : value;
        }
      }) as unknown as CustomElement<Props, ComponentElement>;
    }

    static formAssociated = form;

    static get observedAttributes() {
      return [
        ...Object.entries(props)
          .map(([key, value]) => (key === 'dataset' ? Object.keys(value).map(p => `data-${getAttrName(p)}`) : key))
          .flat()
      ];
    }

    constructor() {
      super();

      if (form) {
        configureFormElement(this);
      }

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
    }

    attributeChangedCallback(name: string, prev: string, curr: string) {
      if (prev !== curr && onAttributeChanged) {
        onAttributeChanged(name, prev, curr, this.self);
      }
    }

    formStateRestoreCallback(state: string) {
      if (form) this.setAttribute('value', state);
    }

    get rootElement() {
      return this.ref('root') as unknown as CustomElement<Props, ComponentElement>;
    }

    render() {
      const tmpl = isFunction(template) ? template(this.self) : template;
      const shadowRoot = this.attachShadow({ mode: 'open' });

      if (isString(tmpl)) {
        shadowRoot.innerHTML = tmpl;
      } else {
        shadowRoot.replaceChildren(...(isArray(tmpl) ? tmpl.flat() : [tmpl]));
      }
    }

    fire(event: string | HTMLTags, options?: CustomEventInit) {
      this.dispatchEvent(new CustomEvent(event, options));
    }

    event(
      id: string | HTMLElement | CustomElement<Props, ComponentElement>,
      event: string | HTMLTags,
      callback: EventListener,
      options?: boolean | AddEventListenerOptions
    ) {
      const el = (isString(id) ? this.ref(`${id}`) : id) as HTMLElement | CustomElement<Props, ComponentElement>;

      el?.addEventListener(event, callback, options);
    }

    ref<T = HTMLElement>(id: string): T {
      return this.shadowRoot?.getElementById(id) as T;
    }
  };

export const define = <Props extends CustomElementProps, ComponentElement = HTMLElement>(
  name: string,
  options: CustomElementOptions<Props, ComponentElement>
) => {
  if (!customElements.get(name)) customElements.define(name, component<Props, ComponentElement>(options));
};

export { classMap } from './styling-element';
