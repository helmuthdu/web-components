/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import type { Sizes } from '../../types';

export type Props = {
  dataset: {
    append?: string;
    color?: 'error' | 'success' | 'info' | 'contrast' | undefined;
    pill?: boolean;
    size?: Sizes;
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'inline-flex flex-wrap items-center justify-center text-center whitespace-nowrap align-middle font-semibold py-0.5 px-2',
    dataset.pill ? 'rounded-full' : 'rounded-lg',
    {
      'text-xs': dataset.size === 'xs',
      'text-sm': dataset.size === 'sm',
      'text-base': dataset.size === 'md',
      'text-lg': dataset.size === 'lg',
      'text-xl': dataset.size === 'xl'
    },
    !dataset.color
      ? 'text-content bg-contrast-50 border-contrast-200'
      : {
          'text-primary-contrast bg-primary border-primary-focus': dataset.color === 'info',
          'text-error-contrast bg-error border-error-focus': dataset.color === 'error',
          'text-success-contrast bg-success border-success-focus': dataset.color === 'success',
          'text-content-contrast bg-contrast-700 border-contrast-800': dataset.color === 'contrast'
        },
    dataset.append
  );

define<Props>('ui-badge', {
  props: {
    dataset: {
      append: undefined,
      pill: undefined,
      size: 'md',
      color: undefined
    }
  },
  onAttributeChanged: (name, prev, curr, { dataset, spot }) => {
    switch (name) {
      case 'data-append':
      case 'data-color':
      case 'data-pill':
      case 'data-size':
        spot('root').className = getClassName({ dataset });
        break;
    }
  },
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <span id="root" className={getClassName({ dataset })}>
        <slot />
      </span>
    </>
  )
});
