import { getAttrName, isArray, isFunction, isObject, isString, valueOf } from './shared';
import { injectStyles } from './styling-element';

type HTMLTags = keyof HTMLElementEventMap;

type CustomElementProps = Record<string, any> | undefined;

type CustomElementOptions<Props extends CustomElementProps> = {
  onAttributeChanged?: (name: string, prev: string, curr: string, host: CustomElement<Props>) => void;
  onConnected?: (host: CustomElement<Props>) => void;
  onDisconnected?: (host: CustomElement<Props>) => void;
  props: Props & Partial<Omit<HTMLElement, keyof Props>>;
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
    spot: <T extends HTMLElement>(id: string) => T;
    host: CustomElement<Props>;
    update: () => void;
  };

export const component = <Props extends CustomElementProps>({
  onAttributeChanged,
  onConnected,
  onDisconnected,
  props = {} as any,
  styles = [],
  template
}: CustomElementOptions<Props>) =>
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
            (this as any)[key] ??= value;
          }
        });
    }

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
        onConnected(this.#self as any);
      }
      this.#ready = true;
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
