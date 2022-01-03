type CustomElementDataSet = {[name: string]: any | undefined};

export type CustomElement<T extends CustomElementDataSet> = Omit<HTMLElement, 'dataset'> & {
  update: () => void;
  fire: (event: string | keyof HTMLElementEventMap, { detail }?: CustomEventInit) => void;
  event: (
    id: string | HTMLElement | CustomElement<T>,
    event: string | keyof HTMLElementEventMap,
    callback: EventListener,
    options?: boolean | AddEventListenerOptions
  ) => void;
  dataset: T
};

type CustomElementOptions<T extends CustomElementDataSet> = {
  onAttributeChanged?: (name: keyof T, prev: string, curr: string, host: CustomElement<T>) => void;
  onConnected?: (host: CustomElement<T>) => void;
  onDisconnected?: (host: CustomElement<T>) => void;
  data: T;
  styles?: unknown[];
  template: (host: CustomElement<T>) => string;
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
        return typeof value === 'function' ? value.bind(target) : key === 'dataset' ? Object.entries(value).reduce(
          (acc, [key, val]) => ({ ...acc, [key]: val === '' ? true : val }),
          {} as typeof value
        ): value;
      }
    });

    constructor() {
      super();
      applyStyles(this.attachShadow({ mode: 'open' }), styles);
      Object.entries(data).filter(([key, value]) => value).forEach(([key, value]) => {
        this.dataset[key] ??= value as string;
      })
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

    attributeChangedCallback(name: keyof T, prev: string, curr: string) {
      if (this.#ready && prev !== curr && onAttributeChanged) {
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
      if (!el) throw new Error(`element with id="${id}" not found`);
      el.addEventListener(event, callback, options);
    }
  };

export const define = <T extends CustomElementDataSet>(name: string, options: CustomElementOptions<T>) => {
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
  if (styles.length > 0) {
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

const getAttrName = (prop: string) => prop.replace(/([A-Z])/g, '-$1').toLowerCase();
