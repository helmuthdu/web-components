import { dom, rawHtml } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import type { Sizes } from '../../types';

export type Props = {
  dataset: {
    append?: string;
    block?: boolean;
    circle?: boolean;
    disabled?: boolean;
    group?: string;
    loading?: boolean;
    outline?: boolean;
    rounded?: boolean;
    size?: Sizes;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'error' | 'success';
  };
};

const getLoadingIcon = ({ dataset }: Props) =>
  rawHtml(/*html*/ `
  <svg
    class="${classMap(
      'absolute animate-spin',
      {
        'h-3 w-3': dataset.size === 'xs',
        'h-4 w-4': dataset.size === 'sm',
        'h-5 w-5': dataset.size === 'md' || !dataset.size,
        'h-6 w-6': dataset.size === 'lg',
        'h-7 w-7': dataset.size === 'xl'
      },
      dataset.outline
        ? {
            'text-primary': dataset.variant === 'primary',
            'text-error': dataset.variant === 'error',
            'text-success': dataset.variant === 'success'
          }
        : {
            'text-primary-contrast': dataset.variant === 'primary',
            'text-error-contrast': dataset.variant === 'error',
            'text-success-contrast': dataset.variant === 'success'
          }
    )}"
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
`);

const getClassName = ({ dataset }: Props) =>
  classMap(
    'inline-flex flex-wrap items-center justify-center text-center font-semibold border-transparent gap-2',
    !dataset.group && 'shadow-sm',
    dataset.group && !dataset.circle
      ? {
          '-mx-px': dataset.outline,
          'rounded-l-lg': dataset.group === 'first',
          'rounded-r-lg': dataset.group === 'last'
        }
      : dataset.rounded
      ? 'rounded-full'
      : 'rounded-lg',
    dataset.block && 'w-full',
    dataset.circle
      ? {
          'rounded-full p-0': true,
          'h-8 w-8': dataset.size === 'xs',
          'h-10 w-10': dataset.size === 'sm',
          'h-12 w-12': dataset.size === 'md',
          'h-14 w-14': dataset.size === 'lg',
          'h-16 w-16': dataset.size === 'xl'
        }
      : dataset.outline && !dataset.disabled
      ? {
          'text-xs px-4 py-0.5 mt-0.5': dataset.size === 'xs',
          'text-sm px-4 py-1.5': dataset.size === 'sm',
          'text-base px-5 py-2.5': dataset.size === 'md',
          'text-lg px-5 py-3.5': dataset.size === 'lg',
          'text-xl px-6 py-3.5': dataset.size === 'xl'
        }
      : {
          'text-xs px-4 py-1': dataset.size === 'xs',
          'text-sm px-4 py-2': dataset.size === 'sm',
          'text-base px-5 py-3': dataset.size === 'md',
          'text-lg px-5 py-4': dataset.size === 'lg',
          'text-xl px-6 py-4': dataset.size === 'xl'
        },
    dataset.disabled
      ? `bg-neutral-500 border-opacity-0 bg-opacity-20 ${dataset.loading ? 'text-transparent' : 'text-neutral-600/25'}`
      : dataset.outline
      ? {
          'bg-transparent border-2': true,
          'border-primary hover:ring-4 focus:ring-4 ring-primary-focus': dataset.variant === 'primary',
          'border-error hover:ring-4 focus:ring-4 ring-error-focus': dataset.variant === 'error',
          'border-success hover:ring-4 focus:ring-4 ring-success-focus': dataset.variant === 'success',
          'text-transparent': dataset.loading,
          [`text-${dataset.variant}`]: !dataset.loading
        }
      : {
          'border-none': true,
          'bg-primary hover:ring-4 focus:ring-4 ring-primary-focus': dataset.variant === 'primary',
          'bg-error hover:ring-4 focus:ring-4 ring-error-focus': dataset.variant === 'error',
          'bg-success hover:ring-4 focus:ring-4 ring-success-focus': dataset.variant === 'success',
          'text-transparent': dataset.loading,
          [`text-${dataset.variant}-contrast`]: !dataset.loading
        },
    dataset.append
  );

define<Props, HTMLButtonElement>('ui-button', {
  props: {
    dataset: {
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
    }
  },
  onAttributeChanged: (name, prev, curr, { classList, root, update, dataset }) => {
    switch (name) {
      case 'data-append':
      case 'data-circle':
      case 'data-group':
      case 'data-outline':
      case 'data-rounded':
      case 'data-size':
      case 'data-variant':
        root.className = getClassName({ dataset });
        break;
      case 'data-loading':
        if (curr === null) {
          root.querySelector('svg')?.remove();
        } else {
          root.prepend(getLoadingIcon({ dataset })[0]);
        }
        root.className = getClassName({ dataset });
        break;
      case 'data-disabled':
        root.disabled = curr !== null;
        root.className = getClassName({ dataset });
        break;
      case 'data-block':
        classList[dataset.block ? 'add' : 'remove']('w-full');
        root.className = getClassName({ dataset });
        break;
      default:
        update();
    }
  },
  onConnected({ classList, dataset }) {
    classList[dataset.block ? 'add' : 'remove']('w-full');
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom(
      'button',
      { id: 'root', type: dataset.type, disabled: dataset.disabled, className: getClassName({ dataset }) },
      dataset.loading && getLoadingIcon({ dataset }),
      dom('slot')
    )
  ]
});
