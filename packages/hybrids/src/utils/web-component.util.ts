export const pickClassNames = (...classes: unknown[]) => {
  return classes
    .reduce((acc: string, arg: any) => {
      if (typeof arg === 'string') {
        acc += `${arg} `;
      } else if (typeof arg === 'object') {
        Object.entries(arg)
          .filter(([_, valid]) => valid)
          .forEach(([key]) => {
            acc += `${key} `;
          });
      }
      return acc;
    }, '')
    .trim();
};

export abstract class WebComponent<T> extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  protected constructor() {
    super();
  }

  withProps(...args: (keyof T)[]): T {
    return args.reduce<T>((acc, val) => {
      // @ts-ignore
      acc[val] = this.getAttribute(val);
      return acc;
    }, {} as T);
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (oldVal !== newVal) {
      this.setAttribute(name, newVal);
    }
  }

  render(template: HTMLTemplateElement) {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
  }
}
