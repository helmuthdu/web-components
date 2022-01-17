import { getAttrName, isArray, isFunction, isObject, isString, normalizeValue } from './shared';
import { injectStyles } from './styling-element';

type CustomElementProps = Record<string, any | undefined>;

export type CustomElement<P extends CustomElementProps> = Omit<HTMLElement, 'dataset'> &
  P & {
    fire: (event: string | keyof HTMLElementEventMap, { detail }?: CustomEventInit) => void;
    event: (
      id: string | HTMLElement | CustomElement<P>,
      event: string | keyof HTMLElementEventMap,
      callback: EventListener,
      options?: boolean | AddEventListenerOptions
    ) => void;
    root: HTMLElement;
    update: () => void;
  };

type CustomElementOptions<P extends CustomElementProps> = {
  onAttributeChanged?: (name: string, prev: string, curr: string, host: CustomElement<P>) => void;
  onConnected?: (host: CustomElement<P>) => void;
  onDisconnected?: (host: CustomElement<P>) => void;
  props: P;
  styles?: unknown[];
  template: (host: CustomElement<P>) => any;
};

export const component = <P extends CustomElementProps>({
  onAttributeChanged,
  onConnected,
  onDisconnected,
  props = {} as P,
  styles = [],
  template
}: CustomElementOptions<P>) =>
  class extends HTMLElement {
    #ready = false;
    #self = new Proxy(this, {
      get(target, key) {
        const value = Reflect.get(target, key);
        return isFunction(value) ? value.bind(target) : normalizeValue(key, value);
      }
    });

    constructor() {
      super();
      injectStyles(this.attachShadow({ mode: 'open' }), styles);
      Object.entries(props)
        .filter(([key, value]) => value)
        .forEach(([key, value]) => {
          if (isObject(value)) {
            Object.assign(
              (this as any)[key],
              Object.entries(value)
                .filter(([k, v]) => v)
                .reduce((acc, [k, v]) => ({ ...acc, [k]: acc[k] ?? v }), (this as any)[key] ?? {})
            );
          } else {
            (this as any)[key] ??= value as string;
          }
        });
      this.update();
    }

    static get observedAttributes() {
      return [
        ...Object.entries(props)
          .map(([key, value]) => (key === 'dataset' ? Object.keys(value).map(p => `data-${getAttrName(p)}`) : key))
          .flat()
      ];
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
        onAttributeChanged(name, prev, curr, this.#self as any);
      }
    }

    update() {
      const tmpl = template ? template(this.#self as any) : '';
      const shadowRoot = this.shadowRoot as ShadowRoot;
      if (isString(tmpl)) {
        shadowRoot.innerHTML = tmpl;
      } else {
        shadowRoot.replaceChildren(...(isArray(tmpl) ? tmpl.flat() : [tmpl]));
      }
    }

    fire(event: string | keyof HTMLElementEventMap, options?: CustomEventInit) {
      this.dispatchEvent(new CustomEvent(event, options));
    }

    event(
      id: string | HTMLElement | CustomElement<P>,
      event: string | keyof HTMLElementEventMap,
      callback: EventListener,
      options?: boolean | AddEventListenerOptions
    ) {
      const el = (isString(id) ? this.shadowRoot?.getElementById(`${id}`) : id) as HTMLElement | CustomElement<P>;
      if (!el) throw new Error(`element with id="${id}" not found`);
      el.addEventListener(event, callback, options);
    }

    get root() {
      return this.shadowRoot?.getElementById(`root`);
    }
  };

export const define = <P extends CustomElementProps>(name: string, options: CustomElementOptions<P>) => {
  if (!window.customElements.get(name)) customElements.define(name, component<P>(options));
};

export { classMap } from './styling-element';
