/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import type { Sizes } from '../../types';

export type Props = {
  type?: 'button' | 'submit' | 'reset';
  dataset: {
    append?: string;
    block?: boolean;
    circle?: boolean;
    disabled?: boolean;
    group?: string;
    loading?: boolean;
    rounded?: boolean;
    size?: Sizes;
    color?: 'primary' | 'error' | 'success';
    variant?: 'outline' | 'text' | undefined
  };
};

const LoadingIcon = ({ dataset }: Props) => (
  <svg
    className={classMap('absolute animate-spin', {
      'h-3 w-3': dataset.size === 'xs',
      'h-4 w-4': dataset.size === 'sm',
      'h-5 w-5': dataset.size === 'md' || !dataset.size,
      'h-6 w-6': dataset.size === 'lg',
      'h-7 w-7': dataset.size === 'xl'
    })}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const getClassName = ({ dataset }: Props) =>
  classMap(
    'inline-flex flex-wrap items-center justify-center text-center font-semibold border-transparent gap-2',
    dataset.loading && 'loading',
    !dataset.group && dataset.variant !== 'text' && 'shadow-sm',
    dataset.group && !dataset.circle
      ? {
          '-mx-px': dataset.variant === 'outline',
          'rounded-l-lg': dataset.group === 'first' && !dataset.rounded,
          'rounded-r-lg': dataset.group === 'last' && !dataset.rounded,
          'rounded-l-full': dataset.group === 'first' && dataset.rounded,
          'rounded-r-full': dataset.group === 'last' && dataset.rounded
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
      : dataset.variant === 'outline' && !dataset.disabled
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
      ? `bg-neutral-500 border-opacity-0 bg-opacity-20 text-content-disabled`
      : dataset.variant === 'text'
      ? {
          'bg-transparent': true,
          'text-primary hover:text-primary-focus': dataset.color === 'primary',
          'text-error hover:text-error-focus': dataset.color === 'error',
          'text-success hover:text-success-focus': dataset.color === 'success'
        }
      : dataset.variant === 'outline'
      ? {
          'bg-transparent border-2': true,
          'text-primary border-primary hover:ring-4 focus:ring-4 ring-primary-focus': dataset.color === 'primary',
          'text-error border-error hover:ring-4 focus:ring-4 ring-error-focus': dataset.color === 'error',
          'text-success border-success hover:ring-4 focus:ring-4 ring-success-focus': dataset.color === 'success'
        }
      : {
          'border-none': true,
          'text-primary-contrast bg-primary hover:ring-4 focus:ring-4 ring-primary-focus':
            dataset.color === 'primary',
          'text-error-contrast bg-error hover:ring-4 focus:ring-4 ring-error-focus': dataset.color === 'error',
          'text-success-contrast bg-success hover:ring-4 focus:ring-4 ring-success-focus': dataset.color === 'success'
        },
    dataset.append
  );

define<Props, HTMLButtonElement>('ui-button', {
  props: {
    type: 'button',
    dataset: {
      append: undefined,
      block: undefined,
      circle: undefined,
      disabled: undefined,
      group: undefined,
      loading: undefined,
      rounded: undefined,
      size: 'md',
      color: 'primary'
    }
  },
  onAttributeChanged: (name, prev, curr, { classList, root, update, dataset }) => {
    switch (name) {
      case 'data-append':
      case 'data-circle':
      case 'data-color':
      case 'data-group':
      case 'data-rounded':
      case 'data-size':
      case 'data-variant':
        root.className = getClassName({ dataset });
        break;
      case 'data-loading':
        if (curr === null) {
          root.querySelector('svg')?.remove();
        } else {
          root.prepend((<LoadingIcon dataset={dataset} />) as any);
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
  template: ({ dataset, children, type }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <style dangerouslySetInnerHTML={{ __html: '.loading slot { visibility: hidden; }' }} />
      <button type={type} id="root" className={getClassName({ dataset })} title={children[0]?.textContent ?? undefined}>
        {dataset.loading && <LoadingIcon dataset={dataset} />}
        <slot />
      </button>
    </>
  )
});
