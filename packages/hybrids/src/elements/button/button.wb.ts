import type { Sizes } from '../../types';
import { pickClassNames, WebComponent } from '../../utils/web-component.util';

type Color = 'primary' | 'secondary' | 'link';

export type ButtonProps = {
  className?: string;
  color?: Color;
  disabled?: boolean;
  fullwidth?: boolean;
  loading?: boolean;
  rounded?: boolean;
  size?: Sizes;
  type?: 'button' | 'reset' | 'submit';
};

const createTemplate = (props: ButtonProps) => {
  const template = document.createElement('template');
  template.innerHTML = /*html*/ `
    <link rel="stylesheet" href="/tailwind.css">
    <button
      class="${pickClassNames(
        'px-4 py-2 text-base font-medium',
        {
          'rounded-lg': props.rounded !== undefined,
          'text-white bg-blue-500 hover:bg-blue-700 border border-transparent': props.color === 'primary',
          'text-blue-500 hover:text-blue-600 bg-white border-solid border-2 border-blue-500 hover:border-blue-600':
            props.color === 'secondary',
          'text-blue-500 border-none bg-transparent': props.color === 'link'
        },
        props.className
      )}">
      <slot />
    </button>
  `;
  return template;
};

customElements.define(
  'tw-button',
  class extends WebComponent<ButtonProps> {
    constructor() {
      super();
      const template = createTemplate(this.withProps('color', 'rounded'));
      this.render(template);
    }
  }
);
