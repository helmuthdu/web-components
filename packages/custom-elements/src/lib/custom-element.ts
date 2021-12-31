type Props = Record<string, Primitive>;

type CustomElement<T extends Props> = HTMLElement & {
  update: () => void;
  fire: (event: string | keyof HTMLElementEventMap, { detail }?: CustomEventInit) => void;
  event: (
    id: string | HTMLElement | CustomElement<T>,
    event: string | keyof HTMLElementEventMap,
    callback: EventListener,
    options?: boolean | AddEventListenerOptions
  ) => void;
} & {
  [K in keyof T]: T[K];
};

type CustomElementEvent<T extends Props> = {
  el: HTMLElement | CustomElement<T>;
  event: string | keyof HTMLElementEventMap;
  callback: EventListener;
};

type CustomElementOptions<T extends Props> = {
  onAttributeChanged?: (name: keyof T, prev: string, curr: string, host: CustomElement<T>) => boolean | void;
  onConnected?: (host: CustomElement<T>) => void;
  onDisconnected?: (host: CustomElement<T>) => void;
  props: T;
  styles?: unknown[];
  template: (host: CustomElement<T>) => string;
};

export const component = <T extends Props>({
  props,
  template,
  styles,
  onAttributeChanged,
  onConnected,
  onDisconnected
}: CustomElementOptions<T>) =>
  class extends HTMLElement {
    #events: Set<CustomElementEvent<T>> = new Set();
    #ready = false;
    #self = new Proxy(this, {
      get(target, key) {
        const value = Reflect.get(target, key);
        return typeof value === 'function' ? value.bind(target) : value;
      }
    });

    constructor() {
      super();
      defineProperties(this as any, props);
      applyStyles(this.attachShadow({ mode: 'open' }), styles);
      this.update();
    }

    static get observedAttributes() {
      return [...Object.keys(props).map(prop => getAttrName(prop))];
    }

    connectedCallback() {
      this.#ready = true;
      if (onConnected) {
        onConnected(this.#self as any);
      }
    }

    disconnectedCallback() {
      this.#events.forEach(({ el, event, callback }) => {
        el.addEventListener(event, callback);
      });

      if (onDisconnected) {
        onDisconnected(this.#self as any);
      }
    }

    attributeChangedCallback(name: keyof T, prev: string, curr: string) {
      if (this.#ready && onAttributeChanged) {
        onAttributeChanged(name, prev, curr, this.#self as any);
      }
    }

    update() {
      // @ts-ignore
      this.shadowRoot.innerHTML = template(this.#self as any);
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
      const el = typeof id === 'string' ? (this.shadowRoot?.getElementById(`${id}`) as HTMLElement) : id;
      if (!(options as AddEventListenerOptions).once) {
        this.#events.add({ el, event, callback });
      }
      el.addEventListener(event, callback, options);
    }
  };

export const define = <T extends Props>(name: string, options: CustomElementOptions<T>) => {
  customElements.define(name, component(options));
};

export const uuid = () => window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

export const classMap = (...classes: unknown[]) =>
  classes
    .reduce((acc: string, arg: unknown) => {
      if (typeof arg === 'string') {
        acc += `${arg} `;
      } else if (typeof arg === 'object' && arg !== null) {
        Object.entries(arg)
          .filter(([_, valid]) => valid)
          .forEach(([key]) => {
            acc += `${key} `;
          });
      }
      return acc;
    }, '')
    .trim();

const applyStyles = (shadowRoot: ShadowRoot, styles: unknown[] = []) => {
  if (styles && styles.length > 0) {
    Promise.all(
      styles.map((style, idx) => {
        if (typeof style === 'string') {
          const sheet = new CSSStyleSheet(); // @ts-ignore
          return sheet.replace(style);
        } else if (style instanceof CSSStyleSheet) {
          return Promise.resolve(style);
        }
        throw new Error(`invalid css in styles`);
      })
    ).then((sheets: CSSStyleSheet[]) => {
      // @ts-ignore
      shadowRoot.adoptedStyleSheets = sheets;
    });
  }
};

const defineProperties = <T extends Props>(target: CustomElement<T>, props: T) => {
  Object.defineProperties(
    target,
    Object.keys(props).reduce((acc, key) => {
      acc[key] = {
        enumerable: true,
        configurable: true,
        get: () => {
          const attr = target.getAttribute(getAttrName(key));
          return (attr === '' ? true : attr) ?? props[key];
        },
        set: (val?: any) => {
          if (val === '' || val) {
            target.setAttribute(getAttrName(key), val === true ? '' : val);
          } else {
            target.removeAttribute(key);
          }
        }
      };
      return acc;
    }, {} as PropertyDescriptorMap)
  );
};

const getAttrName = (prop: string) => prop.replace(/([A-Z])/g, '-$1').toLowerCase();
