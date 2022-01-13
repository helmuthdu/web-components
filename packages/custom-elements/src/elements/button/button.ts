import { classMap, define, markup, rawHtml } from '../../lib/custom-element';
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

const getLoadingIcon = (data: DataSet) => /*html*/ `
  <svg
    class="${classMap(
      'absolute animate-spin',
      {
        'h-3 w-3': data.size === 'xs',
        'h-4 w-4': data.size === 'sm',
        'h-5 w-5': data.size === 'md' || !data.size,
        'h-6 w-6': data.size === 'lg',
        'h-7 w-7': data.size === 'xl'
      },
      data.outline
        ? {
            'text-primary': data.variant === 'primary',
            'text-error': data.variant === 'error',
            'text-success': data.variant === 'success'
          }
        : {
            'text-primary-contrast': data.variant === 'primary',
            'text-error-contrast': data.variant === 'error',
            'text-success-contrast': data.variant === 'success'
          }
    )}"
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
`;

const getClassName = (data: DataSet) =>
  classMap(
    'inline-flex flex-wrap items-center justify-center text-center font-semibold border-transparent gap-2',
    !data.group && 'shadow-sm',
    data.group && !data.circle
      ? {
          '-mx-px': data.outline,
          'rounded-l-lg': data.group === 'first',
          'rounded-r-lg': data.group === 'last'
        }
      : data.rounded
      ? 'rounded-full'
      : 'rounded-lg',
    data.block && 'w-full',
    data.circle
      ? {
          'rounded-full p-0': true,
          'h-8 w-8': data.size === 'xs',
          'h-10 w-10': data.size === 'sm',
          'h-12 w-12': data.size === 'md',
          'h-14 w-14': data.size === 'lg',
          'h-16 w-16': data.size === 'xl'
        }
      : data.outline && !data.disabled
      ? {
          'text-xs px-4 py-0.5 mt-0.5': data.size === 'xs',
          'text-sm px-4 py-1.5': data.size === 'sm',
          'text-base px-5 py-2.5': data.size === 'md',
          'text-lg px-5 py-3.5': data.size === 'lg',
          'text-xl px-6 py-3.5': data.size === 'xl'
        }
      : {
          'text-xs px-4 py-1': data.size === 'xs',
          'text-sm px-4 py-2': data.size === 'sm',
          'text-base px-5 py-3': data.size === 'md',
          'text-lg px-5 py-4': data.size === 'lg',
          'text-xl px-6 py-4': data.size === 'xl'
        },
    data.disabled
      ? `bg-neutral-500 border-opacity-0 bg-opacity-20 ${data.loading ? 'text-transparent' : 'text-neutral-600/25'}`
      : data.outline
      ? {
          'bg-transparent border-2': true,
          'border-primary hover:ring-4 focus:ring-4 ring-primary-focus': data.variant === 'primary',
          'border-error hover:ring-4 focus:ring-4 ring-error-focus': data.variant === 'error',
          'border-success hover:ring-4 focus:ring-4 ring-success-focus': data.variant === 'success',
          'text-transparent': data.loading,
          [`text-${data.variant}`]: !data.loading
        }
      : {
          'border-none': true,
          'bg-primary hover:ring-4 focus:ring-4 ring-primary-focus': data.variant === 'primary',
          'bg-error hover:ring-4 focus:ring-4 ring-error-focus': data.variant === 'error',
          'bg-success hover:ring-4 focus:ring-4 ring-success-focus': data.variant === 'success',
          'text-transparent': data.loading,
          [`text-${data.variant}-contrast`]: !data.loading
        },
    data.append
  );

define<DataSet>('ce-button', {
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
  onAttributeChanged: (name, prev, curr, { classList, root, update, dataset }) => {
    switch (name) {
      case 'append':
      case 'circle':
      case 'disabled':
      case 'group':
      case 'outline':
      case 'rounded':
      case 'size':
      case 'variant':
        root.className = getClassName(dataset);
        break;
      case 'block':
        classList[dataset.block ? 'add' : 'remove']('w-full');
        root.className = getClassName(dataset);
        break;
      default:
        update();
    }
  },
  onConnected({ classList, dataset }) {
    classList[dataset.block ? 'add' : 'remove']('w-full');
  },
  template: ({ dataset }) => {
    const { link, button, slot } = markup;
    return [
      link({ rel: 'stylesheet', href: '/tailwind.css' }),
      button(
        {
          id: 'root',
          type: dataset.type,
          disabled: dataset.disabled,
          className: getClassName(dataset)
        },
        rawHtml(dataset.loading ? getLoadingIcon(dataset) : ''),
        slot()
      )
    ];
  }
});
