type CustomElementEvent = {
  el: HTMLElement;
  event: string | keyof HTMLElementEventMap;
  callback: EventListenerOrEventListenerObject;
};

type CustomElementInstance = {
  current: HTMLElement;
  events: Map<any, Set<CustomElementEvent>>;
};

type CustomElementOptions<T extends Record<string, Primitive>> = {
  onAttributeChanged?: (
    name: keyof T,
    prev: string,
    curr: string,
    props: T,
    flush: () => void,
    host: HTMLElement
  ) => boolean | void;
  onConnected?: (host: HTMLElement, props: T, flush: () => void) => void;
  onDisconnected?: () => void;
  props: T;
  styles?: unknown[];
  template: (props: T, host: HTMLElement) => string;
};

export const component = <T extends Record<string, Primitive>>({
  props,
  template,
  styles,
  onAttributeChanged,
  onConnected,
  onDisconnected
}: CustomElementOptions<T>) => {
  const getAttrName = (prop: string) => prop.replace(/([A-Z])/g, '-$1').toLowerCase();

  return class extends HTMLElement {
    ready = false;
    token = uuid();

    static get observedAttributes() {
      return [...Object.keys(props).map(prop => getAttrName(prop))];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.#defineProperties();
      this.#applyStyles();
      this.flush();
      this.flush = this.flush.bind(this);
    }

    connectedCallback() {
      this.ready = true;
      if (onConnected) {
        instance.current = this;
        onConnected(this, this.props, this.flush);
      }
    }

    disconnectedCallback() {
      instance.events.get(this.token)?.forEach(({ el, event, callback }) => {
        el.addEventListener(event, callback);
      });

      if (onDisconnected) {
        instance.current = this;
        onDisconnected();
      }
    }

    attributeChangedCallback(name: keyof T, prev: string, curr: string) {
      if (this.ready && prev !== curr) {
        if (onAttributeChanged) {
          instance.current = this;
          onAttributeChanged(name, prev, curr, this.props, this.flush, this);
        }
      }
    }

    flush() {
      // @ts-ignore
      this.shadowRoot.innerHTML = template(this.props, this);
    }

    get props() {
      return Object.entries(props).reduce((acc, [key, val]) => {
        const attr = this.getAttribute(getAttrName(key));
        return { ...acc, [key]: (attr === '' ? true : attr) ?? val };
      }, {} as typeof props);
    }

    #applyStyles() {
      if (styles && styles.length > 0) {
        Promise.all(
          styles.map((style, idx) => {
            if (typeof style === 'string') {
              const sheet = new CSSStyleSheet(); // @ts-ignore
              return sheet.replace(style);
            } else if (style instanceof CSSStyleSheet) {
              return Promise.resolve(style);
            } else {
              throw new Error(`invalid css in styles`);
            }
          })
        ).then(sheets => {
          // @ts-ignore
          this.shadowRoot.adoptedStyleSheets = sheets;
        });
      }
    }

    #defineProperties() {
      Object.defineProperties(
        this,
        Object.keys(props).reduce((acc, key) => {
          acc[key] = {
            get: () => this.props[key],
            set: (val?: string) => {
              if (val === '' || val) {
                this.setAttribute(getAttrName(key), val);
              } else {
                this.removeAttribute(key);
              }
            }
          };
          return acc;
        }, {} as PropertyDescriptorMap)
      );
    }
  };
};

export const define = <T extends Record<string, Primitive>>(name: string, options: CustomElementOptions<T>) =>
  customElements.define(name, component(options));

export const instance: CustomElementInstance = {
  current: undefined as any,
  events: new Map()
};

export const ref = (selector: string) => {
  const el = instance.current?.shadowRoot?.querySelector(`*[ref="${selector}"]`) as HTMLElement;
  if (!el) {
    throw new Error(`element with ref="${selector}" not found`);
  }
  return el;
};

export const fire = (event: string, detail: any) => {
  instance.current.dispatchEvent(new CustomEvent(event, { detail }));
};

export const event = (
  selector: string | HTMLElement,
  event: string | keyof HTMLElementEventMap,
  callback: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) => {
  const token = (instance.current as any).token;
  const el = typeof selector === 'string' ? ref(selector) : selector;

  if ((options as AddEventListenerOptions)?.once !== true) {
    if (!instance.events.has(token)) {
      instance.events.set(token, new Set<CustomElementEvent>());
    }
    instance.events.get(token)?.add({ el, event, callback });
  }

  el.addEventListener(event, callback, options);
};

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

export const uuid = () => window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

export const append = (selector: string | HTMLElement, content: string) => {
  const el = typeof selector === 'string' ? ref(selector) : selector;
  const template = document.createElement('template');
  template.innerHTML = content;
  el?.appendChild(template.content.cloneNode(true));
};
