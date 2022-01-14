import { getAttrName, isArray, isFunction, isString } from './shared';
import { injectStyles } from './styling-element';

type CustomElementDataSet = Record<string, any | undefined>;

export type CustomElement<T extends CustomElementDataSet> = Omit<HTMLElement, 'dataset'> & {
  update: () => void;
  fire: (event: string | keyof HTMLElementEventMap, { detail }?: CustomEventInit) => void;
  event: (
    id: string | HTMLElement | CustomElement<T>,
    event: string | keyof HTMLElementEventMap,
    callback: EventListener,
    options?: boolean | AddEventListenerOptions
  ) => void;
  root: HTMLElement;
  dataset: T;
};

type CustomElementOptions<T extends CustomElementDataSet> = {
  onAttributeChanged?: (name: keyof T, prev: string, curr: string, host: CustomElement<T>) => void;
  onConnected?: (host: CustomElement<T>) => void;
  onDisconnected?: (host: CustomElement<T>) => void;
  data: T;
  styles?: unknown[];
  template: (host: CustomElement<T>) => any;
};

export const component = <T extends CustomElementDataSet>({
  onAttributeChanged,
  onConnected,
  onDisconnected,
  data,
  styles = [],
  template
}: CustomElementOptions<T>) =>
  class extends HTMLElement {
    #ready = false;
    #self = new Proxy(this, {
      get(target, key) {
        const value = Reflect.get(target, key);
        return isFunction(value)
          ? value.bind(target)
          : key === 'dataset'
          ? Object.entries(value).reduce((acc, [k, v]) => ({ ...acc, [k]: v === '' ? true : v }), {} as typeof value)
          : value;
      }
    });

    constructor() {
      super();
      injectStyles(this.attachShadow({ mode: 'open' }), styles);
      Object.entries(data)
        .filter(([key, value]) => value)
        .forEach(([key, value]) => {
          this.dataset[key] ??= value as string;
        });
      this.update();
    }

    static get observedAttributes() {
      return [...Object.keys(data).map(prop => `data-${getAttrName(prop)}`)];
    }

    connectedCallback() {
      this.#ready = true;
      if (onConnected) {
        onConnected(this.#self as any);
      }
    }

    disconnectedCallback() {
      if (onDisconnected) {
        onDisconnected(this.#self as any);
      }
    }

    attributeChangedCallback(name: string, prev: string, curr: string) {
      if (this.#ready && prev !== curr && onAttributeChanged) {
        onAttributeChanged(name.replace('data-', '') as keyof T, prev, curr, this.#self as any);
      }
    }

    update() {
      const tmpl = template(this.#self as any);
      const shadowRoot = this.shadowRoot as ShadowRoot;
      if (isString(tmpl)) {
        shadowRoot.innerHTML = tmpl;
      } else if (isArray(tmpl)) {
        shadowRoot.replaceChildren(...tmpl.flat());
      }
    }

    fire(event: string | keyof HTMLElementEventMap, options?: CustomEventInit) {
      this.dispatchEvent(new CustomEvent(event, options));
    }

    event(
      id: string | HTMLElement | CustomElement<T>,
      event: string | keyof HTMLElementEventMap,
      callback: EventListener,
      options?: boolean | AddEventListenerOptions
    ) {
      const el = (isString(id) ? this.shadowRoot?.getElementById(`${id}`) : id) as HTMLElement | CustomElement<T>;
      if (!el) throw new Error(`element with id="${id}" not found`);
      el.addEventListener(event, callback, options);
    }

    get root() {
      return this.shadowRoot?.getElementById(`root`);
    }
  };

export const define = <T extends CustomElementDataSet>(name: string, options: CustomElementOptions<T>) => {
  customElements.define(name, component(options));
};

export { classMap } from './styling-element';
