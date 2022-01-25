import { getAttrName, isArray, isFunction, isObject, isString, valueOf } from './shared';
import { injectStyles } from './styling-element';

type HTMLTags = keyof HTMLElementEventMap;

type CustomElementProps = Record<string, any> | undefined;

type CustomElementOptions<P extends CustomElementProps, T extends HTMLElement> = {
  onAttributeChanged?: (name: string, prev: string, curr: string, host: CustomElement<P, T>) => void;
  onConnected?: (host: CustomElement<P, T>) => void;
  onDisconnected?: (host: CustomElement<P, T>) => void;
  props: P & Partial<Omit<HTMLElement, keyof P>>;
  styles?: unknown[];
  template: (host: CustomElement<P, T>) => any;
};

export type CustomElement<P extends CustomElementProps, T extends HTMLElement> = Omit<HTMLElement, keyof P> &
  P & {
    fire: (event: string | HTMLTags, { detail }?: CustomEventInit) => void;
    event: (
      id: string | HTMLElement | CustomElement<P, T>,
      event: string | HTMLTags,
      callback: EventListener,
      options?: boolean | AddEventListenerOptions
    ) => void;
    root: T;
    host: CustomElement<P, T>;
    update: () => void;
  };

export const component = <P extends CustomElementProps, T extends HTMLElement>({
  onAttributeChanged,
  onConnected,
  onDisconnected,
  props = {} as any,
  styles = [],
  template
}: CustomElementOptions<P, T>) =>
  class extends HTMLElement {
    host = this;

    #ready = false;
    #self = new Proxy(this, {
      get(target, key) {
        const value = Reflect.get(target, key);
        return isFunction(value) ? value.bind(target) : valueOf(key, value);
      }
    });

    constructor() {
      super();
      this.style.visibility = 'hidden'; // initialise to avoid FOUC
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
      setTimeout(() => (this.style.visibility = ''), 100); // remove after a shot time to avoid FOUC
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

    fire(event: string | HTMLTags, options?: CustomEventInit) {
      this.dispatchEvent(new CustomEvent(event, options));
    }

    event(
      id: string | HTMLElement | CustomElement<P, T>,
      event: string | HTMLTags,
      callback: EventListener,
      options?: boolean | AddEventListenerOptions
    ) {
      const el = (isString(id) ? this.shadowRoot?.getElementById(`${id}`) : id) as HTMLElement | CustomElement<P, T>;
      if (!el) throw new Error(`element with id="${id}" not found`);
      el.addEventListener(event, callback, options);
    }

    get root() {
      return this.shadowRoot?.getElementById(`root`);
    }
  };

export const define = <P extends CustomElementProps, T extends HTMLElement = HTMLElement>(
  name: string,
  options: CustomElementOptions<P, T>
) => {
  if (!window.customElements.get(name)) customElements.define(name, component<P, T>(options));
};

export { classMap } from './styling-element';
