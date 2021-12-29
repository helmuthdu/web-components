import type { Color, Sizes } from '../../types';
import { classMap, define, hasValue, ref } from '../../lib/custom-elements';
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

const renderLoading = (attrs: Props) => {
  return /*html*/ `
    <svg
      id="loading"
      class="${classMap('absolute animate-spin', {
        'h-3 w-3': attrs.size === 'xs',
        'h-4 w-4': attrs.size === 'sm',
        'h-5 w-5': attrs.size === 'md',
        'h-6 w-6': attrs.size === 'lg',
        'h-7 w-7': attrs.size === 'xl'
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

const getClassNames = (attrs: Props) =>
  classMap(attrs.append, 'btn', {
    'btn-block': hasValue(attrs.block),
    'btn-circle': hasValue(attrs.circle),
    'btn-disabled': hasValue(attrs.disabled),
    'btn-group': hasValue(attrs.group),
    'btn-group-first': attrs.group === 'first',
    'btn-group-last': attrs.group === 'last',
    'btn-outline': hasValue(attrs.outline),
    'btn-loading': hasValue(attrs.loading),
    'btn-rounded': hasValue(attrs.rounded),
    [`btn-${attrs.size}`]: attrs.size,
    [`btn-${attrs.variant}`]: attrs.variant
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
  onAttributeChanged: (name, prev, curr, flush, props) => {
    const el = ref('button');

    switch (name) {
      case 'append':
      case 'block':
      case 'circle':
      case 'disabled':
      case 'group':
      case 'outline':
      case 'rounded':
      case 'size':
      case 'variant':
        el.className = getClassNames(props);
        break;
      case 'loading':
        el.className = getClassNames(props);
        flush();
        break;
      default:
        flush();
    }
  },
  styles: [styles],
  template: (props, host) => {
    if (hasValue(props.block)) {
      host.classList.add('w-full');
    } else {
      host.classList.remove('w-full');
    }

    return /*html*/ `
      <link rel="stylesheet" href="/tailwind.css" />
      <button ref="button" class="${getClassNames(props)}">
        ${hasValue(props.loading) ? renderLoading(props) : ''}
        <slot></slot>
      </button>
    `;
  }
});
