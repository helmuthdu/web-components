import htm from 'htm';
import vhtml from 'vhtml';

type DefineOptions<T> = {
  props: T;
  render: (props: T) => string | string[];
  onUpdate?: (name: keyof T, prev: string, curr: string) => boolean | void;
  onMounted?: () => void;
  onRemoved?: () => void;
};

type EventItem = { el: HTMLElement; event: string; callback: (...args: any) => void };

let currentlyRenderedInstance: any;

const eventList: Map<any, Set<EventItem>> = new Map();

export const event = (selector: string | HTMLElement, event: string, callback: (...args: any) => void) => {
  const el =
    typeof selector === 'string'
      ? (currentlyRenderedInstance?.shadowRoot?.querySelector(selector) as HTMLElement)
      : selector;

  if (!eventList.has(currentlyRenderedInstance.token)) {
    eventList.set(currentlyRenderedInstance.token, new Set<EventItem>());
  }
  eventList.get(currentlyRenderedInstance.token)?.add({ el, event, callback });

  el.addEventListener(event, callback);
};

export const emit = (event: string, detail: any) => {
  currentlyRenderedInstance.dispatchEvent(new CustomEvent(event, { detail }));
};

export const useElementRef = (selector: string) => {
  return currentlyRenderedInstance?.shadowRoot?.querySelector(`*[ref="${selector}"]`);
};

export const define = <T>(name: string, { props, render, onUpdate, onMounted, onRemoved }: DefineOptions<T>) => {
  customElements.define(
    name,
    class extends HTMLElement {
      token = Symbol(name);
      props: T;

      #updateContent() {
        if (this.shadowRoot) {
          const content = render(props);
          this.shadowRoot.innerHTML = Array.isArray(content) ? content.join('') : content;
        }
      }

      static get observedAttributes() {
        return [...Object.keys(props)];
      }

      constructor() {
        super();

        const self = this;

        // @ts-ignore
        this.props = new Proxy(props, {
          get(target: T, key: keyof T) {
            return target[key];
          },
          set(target: T, key: keyof T, val: any) {
            if (val === '' || val) {
              self.setAttribute(key as string, val);
            } else {
              self.removeAttribute(key as string);
            }
            target[key] = val;
            return true;
          }
        });
      }

      connectedCallback() {
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        const content = render(props);
        template.innerHTML = Array.isArray(content) ? content.join('') : content;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));

        if (onMounted) {
          currentlyRenderedInstance = this;
          onMounted();
        }
      }

      disconnectedCallback() {
        eventList.get(this.token)?.forEach(({ el, event, callback }) => {
          el.addEventListener(event, callback);
        });

        if (onRemoved) {
          currentlyRenderedInstance = this;
          onRemoved();
        }
      }

      attributeChangedCallback(name: keyof T, prev: string, curr: string) {
        // console.log(name, prev, curr);
        if (prev !== curr) {
          // @ts-ignore
          this.props[name] = curr;
          if (onUpdate) {
            currentlyRenderedInstance = this;
            if (onUpdate(name, prev, curr)) {
              this.#updateContent();
            }
          }
        }
      }
    }
  );
};

export const html = htm.bind(vhtml);
