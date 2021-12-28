import type { Color, Sizes } from '../../types';
import { define, hasAttribute, ref } from '../../utils/component.util';
import { pickClassNames } from '../../utils/styling.util';
import styles from './button.css';

export type Attributes = {
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

export const attributes: Attributes = {
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
};

const renderLoading = (attrs: Attributes) => {
  return /*html*/ `
    <svg
      id="loading"
      class="${pickClassNames('absolute animate-spin', {
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

const getClassNames = (attrs: Attributes) =>
  pickClassNames(attrs.append, 'btn', {
    'btn-block': hasAttribute(attrs.block),
    'btn-circle': hasAttribute(attrs.circle),
    'btn-disabled': hasAttribute(attrs.disabled),
    'btn-group': hasAttribute(attrs.group),
    'btn-group-first': attrs.group === 'first',
    'btn-group-last': attrs.group === 'last',
    'btn-outline': hasAttribute(attrs.outline),
    'btn-loading': hasAttribute(attrs.loading),
    'btn-rounded': hasAttribute(attrs.rounded),
    [`btn-${attrs.size}`]: attrs.size,
    [`btn-${attrs.variant}`]: attrs.variant
  });

define<Attributes>('tw-button', {
  attributes,
  onAttributeChanged: (name, _prev, _curr, attrs) => {
    const el = ref('button');

    if (!el) {
      return false;
    }

    switch (name) {
      case 'append':
      case 'block':
      case 'circle':
      case 'disabled':
      case 'group':
      case 'outline':
      case 'rounded':
      case 'variant':
        el.className = getClassNames(attrs);
        return false;
      case 'loading':
        el.className = getClassNames(attrs);
        return true;
      default:
        return true;
    }
  },
  styles: [styles],
  template: (attrs, host) => {
    if (hasAttribute(attrs.block)) {
      host.classList.add('w-full');
    } else {
      host.classList.remove('w-full');
    }

    return /*html*/ `
      <link rel="stylesheet" href="/tailwind.css" />
      <button ref="button" class="${getClassNames(attrs)}">
        ${hasAttribute(attrs.loading) ? renderLoading(attrs) : ''}
        <slot></slot>
      </button>
    `;
  }
});
