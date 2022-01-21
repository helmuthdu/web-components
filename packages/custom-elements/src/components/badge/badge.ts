import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import type { Sizes } from '../../types';

export type Props = {
  dataset: {
    append?: string;
    pill?: boolean;
    size?: Sizes;
    variant?: 'error' | 'success' | 'info' | 'contrast' | undefined;
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
    !dataset.variant
      ? 'text-content bg-contrast-50 border-contrast-200'
      : {
          'text-primary-contrast bg-primary border-primary-focus': dataset.variant === 'info',
          'text-error-contrast bg-error border-error-focus': dataset.variant === 'error',
          'text-success-contrast bg-success border-success-focus': dataset.variant === 'success',
          'text-content-contrast bg-contrast-700 border-contrast-800': dataset.variant === 'contrast'
        },
    dataset.append
  );

define<Props>('ui-badge', {
  props: {
    dataset: {
      append: undefined,
      pill: undefined,
      size: 'md',
      variant: undefined
    }
  },
  onAttributeChanged: (name, prev, curr, { dataset, root }) => {
    switch (name) {
      case 'data-append':
      case 'data-pill':
      case 'data-size':
      case 'data-variant':
        root.className = getClassName({ dataset });
        break;
    }
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('span', { id: 'root', className: getClassName({ dataset }) }, dom('slot'))
  ]
});
