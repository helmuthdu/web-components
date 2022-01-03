import { classMap, define } from '../../lib/custom-element';
import type { Color, Sizes } from '../../types';
import styles from './button.css';

export type Props = {
  append?: string;
  block?: boolean;
  circle?: boolean;
  disabled?: boolean;
  group?: string;
  loading?: boolean;
  outline?: boolean;
  rounded?: boolean;
  size?: Sizes;
  type?: 'button' | 'reset' | 'submit';
  variant?: Color | 'link';
};

const renderLoading = (props: Props) => {
  return /*html*/ `
    <svg
      id="loading"
      class="${classMap('absolute animate-spin', {
        'h-3 w-3': props.size === 'xs',
        'h-4 w-4': props.size === 'sm',
        'h-5 w-5': props.size === 'md',
        'h-6 w-6': props.size === 'lg',
        'h-7 w-7': props.size === 'xl'
      })}"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style="">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  `;
};

const getClassNames = (props: Props) =>
  classMap(props.append, 'btn', {
    'btn-block': props.block,
    'btn-circle': props.circle,
    'btn-disabled': props.disabled,
    'btn-group': props.group,
    'btn-group-first': props.group === 'first',
    'btn-group-last': props.group === 'last',
    'btn-outline': props.outline,
    'btn-loading': props.loading,
    'btn-rounded': props.rounded,
    [`btn-${props.size}`]: props.size,
    [`btn-${props.variant}`]: props.variant
  });

define<Props>('tw-button', {
  props: {
    append: undefined,
    block: undefined,
    circle: undefined,
    disabled: undefined,
    group: undefined,
    loading: undefined,
    outline: undefined,
    rounded: undefined,
    size: 'md',
    type: 'button',
    variant: 'blue'
  },
  onAttributeChanged: (name, prev, curr, { shadowRoot, update, ...props }) => {
    const el = shadowRoot?.getElementById('button') as HTMLButtonElement;
    switch (name) {
      case 'append':
      case 'circle':
      case 'disabled':
      case 'group':
      case 'outline':
      case 'rounded':
      case 'size':
      case 'variant':
        el.className = getClassNames(props);
        break;
      case 'block':
      case 'loading':
        el.className = getClassNames(props);
        update();
        break;
      default:
        update();
    }
  },
  styles: [styles],
  template: ({ classList, ...props }) => {
    if (props.block) {
      classList.add('w-full');
    } else {
      classList.remove('w-full');
    }
    return /*html*/ `
      <link rel="stylesheet" href="/tailwind.css" />
      <button id="button" class="${getClassNames(props)}">
        ${props.loading ? renderLoading(props) : ''}
        <slot></slot>
      </button>
    `;
  }
});
