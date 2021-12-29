type ComponentOptions<T extends Record<string, Primitive>> = {
  onAttributeChanged?: (
    name: keyof T,
    prev: string,
    curr: string,
    flush: () => void,
    props: T,
    host: HTMLElement
  ) => boolean | void;
  onConnected?: (host: HTMLElement, props: T, flush: () => void) => void;
  onDisconnected?: () => void;
  props: T;
  styles?: string[];
  template: (props: T, host: HTMLElement) => string;
};

export const component = <T extends Record<string, Primitive>>({
  props,
  template,
  styles,
  onAttributeChanged,
  onConnected,
  onDisconnected
}: ComponentOptions<T>) => {
  return class extends HTMLElement {
    ready = false;
    token = uuid();

    static get observedAttributes() {
      return [...Object.keys(props).map(prop => getAttrName(prop))];
    }

    get props() {
      return Object.entries(props).reduce(
        (acc, [key, val]) => ({ ...acc, [key]: this.getAttribute(getAttrName(key)) ?? val }),
        {} as typeof props
      );
    }

    constructor() {
      super();

      Object.defineProperties(
        this,
        Object.keys(props).reduce((acc, key) => {
          acc[key] = {
            get: () => this.props[key],
            set: (val?: string | number) => {
              if (hasValue(val)) {
                this.setAttribute(getAttrName(key), val as string);
              } else {
                this.removeAttribute(key);
              }
            }
          };
          return acc;
        }, {} as PropertyDescriptorMap)
      );

      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = template(this.props, this);
      if (styles) {
        // @ts-ignore
        shadow.adoptedStyleSheets = styles;
      }

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
          onAttributeChanged(name, prev, curr, this.flush, this.props, this);
        }
      }
    }

    flush() {
      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = template(this.props, this);
      }
    }
  };
};

export const define = <T extends Record<string, Primitive>>(name: string, options: ComponentOptions<T>) =>
  customElements.define(name, component(options));

type ComponentEvent = { el: HTMLElement; event: string; callback: (...args: any) => void };

type ComponentInstance = {
  current: HTMLElement;
  events: Map<any, Set<ComponentEvent>>;
};

export const instance: ComponentInstance = {
  current: undefined as any,
  events: new Map()
};

export const append = (selector: string | HTMLElement, content: string) => {
  const el = typeof selector === 'string' ? ref(selector) : selector;
  const template = document.createElement('template');
  template.innerHTML = content;
  el?.appendChild(template.content.cloneNode(true));
};

export const emit = (event: string, detail: any) => {
  instance.current.dispatchEvent(new CustomEvent(event, { detail }));
};

export const event = (
  selector: string | HTMLElement,
  event: string,
  callback: (...args: any) => void,
  options?: boolean | AddEventListenerOptions
) => {
  // @ts-ignore
  const { token } = instance.current;
  const el = typeof selector === 'string' ? ref(selector) : selector;

  if ((options as AddEventListenerOptions)?.once !== true) {
    if (!instance.events.has(token)) {
      instance.events.set(token, new Set<ComponentEvent>());
    }
    instance.events.get(token)?.add({ el, event, callback });
  }

  el.addEventListener(event, callback, options);
};

export const ref = (selector: string) => {
  const el = instance.current?.shadowRoot?.querySelector(`*[ref="${selector}"]`) as HTMLElement;
  if (!el) {
    throw new Error(`element ${selector} not found`);
  }
  return el;
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

export const hasValue = (value: any) => value === '' || Boolean(value);

export const getAttrName = (prop: string) => prop.replace(/([A-Z])/g, '-$1').toLowerCase();
