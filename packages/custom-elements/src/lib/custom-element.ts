import { configureFormElement } from './form-element';
import { isArray, isFunction, isObject, isString } from './shared';
import { injectStyles } from './styling-element';

type HTMLTags = keyof HTMLElementEventMap;

type CustomElementProps = Record<string, any> | undefined;

type CustomElementOptions<Props extends CustomElementProps> = {
  onAttributeChanged?: (name: string, prev: string, curr: string, host: CustomElement<Props>) => void;
  onConnected?: (host: CustomElement<Props>) => void;
  onDisconnected?: (host: CustomElement<Props>) => void;
  props: Props & Partial<Omit<HTMLElement, keyof Props>>;
  form?: boolean;
  styles?: unknown[];
  template: (host: CustomElement<Props>) => any;
};

export type CustomElement<Props extends CustomElementProps> = Omit<HTMLElement, keyof Props> &
  Props & {
    fire: (event: string | HTMLTags, { detail }?: CustomEventInit) => void;
    event: (
      id: string | HTMLElement | CustomElement<Props>,
      event: string | HTMLTags,
      callback: EventListener,
      options?: boolean | AddEventListenerOptions
    ) => void;
    hostElement: CustomElement<Props>;
    spot: <T extends HTMLElement>(id: string) => T;
    update: () => void;
    value?: string;
  };

const getAttrName = (prop: string) => prop.replace(/([A-Z])/g, '-$1').toLowerCase();

const valueOf = (key: string | symbol, value: any) =>
  key === 'dataset'
    ? Object.entries(value).reduce((acc, [k, v]) => ({ ...acc, [k]: v === '' ? true : v }), {} as typeof value)
    : value;

const createProxyElement = (customElement: HTMLElement) =>
  new Proxy(customElement, {
    get(target, key) {
      const value = Reflect.get(target, key);
      return isFunction(value) ? value.bind(target) : valueOf(key, value);
    }
  });

export const component = <Props extends CustomElementProps>({
  form = false,
  onAttributeChanged,
  onConnected,
  onDisconnected,
  props = {} as any,
  styles = [],
  template
}: CustomElementOptions<Props>) =>
  class extends HTMLElement {
    #isConnected = false;
    #proxyElement = createProxyElement(this);
    hostElement = this;

    constructor() {
      super();
      injectStyles(this.attachShadow({ mode: 'open' }), styles);
      Object.entries(props)
        .filter(([_, value]) => value !== undefined)
        .forEach(([prop, value]) => {
          if (isObject(value)) {
            Object.assign(
              (this as any)[prop],
              Object.entries(value)
                .filter(([_, val]) => val)
                .reduce((acc, [key, val]) => ({ ...acc, [key]: acc[key] ?? val }), (this as any)[prop] ?? {})
            );
          } else {
            (this as any)[prop] ??= value;
          }
        });
      if (form) {
        configureFormElement(this);
      }
    }

    static formAssociated = form;

    static get observedAttributes() {
      return [
        ...Object.entries(props)
          .map(([key, value]) => (key === 'dataset' ? Object.keys(value).map(p => `data-${getAttrName(p)}`) : key))
          .flat()
      ];
    }

    connectedCallback() {
      // workaround to avoid FOUC
      this.style.visibility = 'hidden';
      setTimeout(() => (this.style.visibility = ''), 100);

      this.update();

      if (onConnected) {
        onConnected(this.#proxyElement as any);
      }

      this.#isConnected = true;
    }

    disconnectedCallback() {
      if (onDisconnected) {
        onDisconnected(this.#proxyElement as any);
      }
    }

    attributeChangedCallback(name: string, prev: string, curr: string) {
      if (this.#isConnected && prev !== curr && onAttributeChanged) {
        onAttributeChanged(name, prev, curr, this.#proxyElement as any);
      }
    }

    formStateRestoreCallback(state: string) {
      if (form) this.setAttribute('value', state);
    }

    update() {
      const tmpl = template ? template(this.#proxyElement as any) : '';
      const shadowRoot = this.shadowRoot as ShadowRoot;
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
      id: string | HTMLElement | CustomElement<Props>,
      event: string | HTMLTags,
      callback: EventListener,
      options?: boolean | AddEventListenerOptions
    ) {
      const el = (isString(id) ? this.shadowRoot?.getElementById(`${id}`) : id) as HTMLElement | CustomElement<Props>;
      if (!el) throw new Error(`element with id="${id}" not found`);
      el.addEventListener(event, callback, options);
    }

    spot(id: string) {
      return this.shadowRoot?.getElementById(id);
    }
  };

export const define = <Props extends CustomElementProps>(name: string, options: CustomElementOptions<Props>) => {
  if (!window.customElements.get(name)) customElements.define(name, component<Props>(options));
};

export { classMap } from './styling-element';
