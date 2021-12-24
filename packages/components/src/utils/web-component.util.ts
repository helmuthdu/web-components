export abstract class WebComponentHTMLElement<T extends Record<string, any>> extends HTMLElement {
  #props!: T;
  #eventList: { el: HTMLElement; event: string; action: (...args: any) => void }[] = [];

  constructor() {
    super();
  }

  #generateTemplate(): HTMLTemplateElement {
    const template = document.createElement('template');
    template.innerHTML = this.render(this.#props);
    return template;
  }

  disconnectedCallback() {
    this.#eventList.forEach(({ el, event, action }) => {
      el.addEventListener(event, action);
    });
  }

  abstract render(props: T): string;

  addEvent(name: string, event: string, action: (...args: any) => void) {
    const el = this.shadowRoot?.querySelector(name) as HTMLElement;
    el.addEventListener(event, action);
    this.#eventList.push({ el, event, action });
  }

  fire(eventType: string, detail: any) {
    this.dispatchEvent(new CustomEvent(eventType, { detail }));
  }

  init({ props }: { props: T }) {
    this.#props = props;
    const template = this.#generateTemplate();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  hasProp(name: keyof T) {
    const prop = this.#props[name];
    return prop === '' || prop;
  }
}
