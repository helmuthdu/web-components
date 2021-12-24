export abstract class WebComponentHTMLElement<T extends Record<string, any>> extends HTMLElement {
  #props!: T;

  constructor() {
    super();
  }

  init({ props }: { props: T }) {
    this.#props = props;
    const template = this.generateTemplate();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  generateTemplate(): HTMLTemplateElement {
    const template = document.createElement('template');
    template.innerHTML = this.render(this.withAttributes());
    return template;
  }

  abstract render(props: T): string;

  withAttributes(): T {
    const entries: Entries<T> = Object.entries(this.#props);
    return entries.reduce<T>((acc, [key, val]) => {
      // @ts-ignore
      acc[key] = this.getAttribute(key) || val;
      return acc;
    }, {} as T);
  }

  hasProp(name: keyof T) {
    const prop = this.#props[name];
    return prop === '' || prop;
  }
}
