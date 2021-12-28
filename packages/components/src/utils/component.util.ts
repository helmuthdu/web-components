type DefineOptions<T extends Record<string, string | number | boolean>> = {
  attributes: T;
  onAttributeChanged?: (name: keyof T, prev: string, curr: string, attrs: T, host: HTMLElement) => boolean | void;
  onConnected?: (host: HTMLElement) => void;
  onDisconnected?: () => void;
  styles?: string[];
  template: (attributes: T, host: HTMLElement) => string;
};

let currentInstance: any;

type EventItem = { el: HTMLElement; event: string; callback: (...args: any) => void };

const eventList: Map<any, Set<EventItem>> = new Map();

export const append = (selector: string | HTMLElement, content: string) => {
  const el = typeof selector === 'string' ? ref(selector) : selector;
  const template = document.createElement('template');
  template.innerHTML = content;
  el?.appendChild(template.content.cloneNode(true));
};

export const event = (
  selector: string | HTMLElement,
  event: string,
  callback: (...args: any) => void,
  options?: boolean | AddEventListenerOptions
) => {
  const el = typeof selector === 'string' ? ref(selector) : selector;

  if ((options as AddEventListenerOptions)?.once !== true) {
    if (!eventList.has(currentInstance.token)) {
      eventList.set(currentInstance.token, new Set<EventItem>());
    }
    eventList.get(currentInstance.token)?.add({ el, event, callback });
  }

  el.addEventListener(event, callback, options);
};

export const emit = (event: string, detail: any) => {
  currentInstance.dispatchEvent(new CustomEvent(event, { detail }));
};

export const ref = (selector: string) => currentInstance?.shadowRoot?.querySelector(`*[ref="${selector}"]`);

export const uuid = (): string => window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

export const hasAttribute = (value: any) => value === '' || value;

export const define = <T extends Record<string, string | number | boolean>>(
  name: string,
  { attributes, template, styles, onAttributeChanged, onConnected, onDisconnected }: DefineOptions<T>
) =>
  customElements.define(
    name,
    class extends HTMLElement {
      #attributes: T;

      token = Symbol(name);

      static get observedAttributes() {
        return [...Object.keys(attributes)];
      }

      constructor() {
        super();

        this.#attributes = Object.entries(attributes).reduce(
          (acc, [key, val]) => ({ ...acc, [key]: this.getAttribute(key) ?? val }),
          {} as typeof attributes
        );

        Object.defineProperties(
          this,
          Object.keys(this.#attributes).reduce((acc, key) => {
            acc[key] = {
              get: () => this.#attributes[key],
              set: (newVal?: string) => {
                if (newVal === '' || newVal) {
                  this.setAttribute(key, newVal);
                } else {
                  this.removeAttribute(key);
                }
              }
            };
            return acc;
          }, {} as PropertyDescriptorMap)
        );

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = template(this.#attributes, this);
        if (styles) {
          // @ts-ignore
          shadow.adoptedStyleSheets = styles;
        }
      }

      connectedCallback() {
        if (onConnected) {
          currentInstance = this;
          onConnected(this);
        }
      }

      disconnectedCallback() {
        eventList.get(this.token)?.forEach(({ el, event, callback }) => {
          el.addEventListener(event, callback);
        });

        if (onDisconnected) {
          currentInstance = this;
          onDisconnected();
        }
      }

      attributeChangedCallback(name: keyof T, prev: string, curr: string) {
        if (prev !== curr && this.shadowRoot) {
          // @ts-ignore
          this.#attributes[name] = curr === null ? undefined : curr;
          if (onAttributeChanged) {
            currentInstance = this;
            if (onAttributeChanged(name, prev, curr, this.#attributes, this)) {
              this.shadowRoot.innerHTML = template(this.#attributes, this);
            }
          }
        }
      }
    }
  );
