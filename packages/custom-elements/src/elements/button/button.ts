import { classMap, define } from '../../lib/custom-element';
import type { Sizes } from '../../types';

export type DataSet = {
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
  variant?: 'primary' | 'error' | 'success';
};

const renderLoading = (data: DataSet) => /*html*/ `
    <svg
      id="loading"
      class="${classMap('absolute animate-spin', {
        'h-3 w-3': data.size === 'xs',
        'h-4 w-4': data.size === 'sm',
        'h-5 w-5': data.size === 'md' || !data.size,
        'h-6 w-6': data.size === 'lg',
        'h-7 w-7': data.size === 'xl'
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

const getClassNames = (data: DataSet) => {
  return classMap(
    'btn',
    {
      'btn-block': data.block,
      'btn-circle': data.circle,
      'btn-disabled': data.disabled,
      'btn-group': data.group,
      'btn-group-first': data.group === 'first',
      'btn-group-last': data.group === 'last',
      'btn-outline': data.outline,
      'btn-loading': data.loading,
      'btn-rounded': data.rounded,
      [`btn-${data.size}`]: data.size,
      [`btn-${data.variant}`]: data.variant
    },
    data.append
  );
};

define<DataSet>('tw-button', {
  data: {
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
    variant: 'primary'
  },
  onAttributeChanged: (name, prev, curr, { shadowRoot, update, dataset }) => {
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
        el.className = getClassNames(dataset);
        break;
      case 'block':
      case 'loading':
        el.className = getClassNames(dataset);
        update();
        break;
      default:
        update();
    }
  },
  template: ({ classList, dataset }) => {
    if (dataset.block) {
      classList.add('w-full');
    } else {
      classList.remove('w-full');
    }
    return /*html*/ `
      <link rel="stylesheet" href="/tailwind.css" />
      <button type="${dataset.type}" id="button" class="${getClassNames(dataset)}">
        ${dataset.loading ? renderLoading(dataset) : ''}
        <slot></slot>
      </button>
    `;
  }
});
