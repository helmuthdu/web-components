import tailwind from '../../../tailwind.css';
import { define, html } from 'hybrids';
import type { Sizes } from '../../types';
import { pickClassNames } from '../../utils/styling.util';

type Color = 'primary' | 'secondary' | 'link';

export type ButtonProps = {
  color?: Color;
  disabled?: boolean;
  fullwidth?: boolean;
  loading?: boolean;
  rounded?: boolean;
  size?: Sizes;
  type?: 'button' | 'reset' | 'submit';
};

export default define<ButtonProps>({
  tag: 'tw-button',
  color: undefined,
  disabled: undefined,
  fullwidth: undefined,
  loading: undefined,
  rounded: undefined,
  size: undefined,
  type: 'button',
  render: props =>
    html`
      <button
        type="${props.type}"
        className="${pickClassNames(
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
    `.style(tailwind)
});
