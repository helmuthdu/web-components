import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import type { Sizes } from '../../types';

export type DataSet = {
  append?: string;
  pill?: boolean;
  size?: Sizes;
  variant?: 'error' | 'success' | 'info' | 'contrast' | undefined;
};

const getClassName = (data: DataSet) =>
  classMap(
    'inline-flex flex-wrap items-center justify-center text-center whitespace-nowrap align-middle font-semibold py-0.5 px-2',
    data.pill ? 'rounded-full' : 'rounded-lg',
    {
      'text-xs': data.size === 'xs',
      'text-sm': data.size === 'sm',
      'text-base': data.size === 'md',
      'text-lg': data.size === 'lg',
      'text-xl': data.size === 'xl'
    },
    !data.variant
      ? 'text-content bg-contrast-50 border-contrast-200'
      : {
          'text-primary-contrast bg-primary border-primary-focus': data.variant === 'info',
          'text-error-contrast bg-error border-error-focus': data.variant === 'error',
          'text-success-contrast bg-success border-success-focus': data.variant === 'success',
          'text-contrast-50 bg-contrast-800 border-contrast-700': data.variant === 'contrast'
        },
    data.append
  );

define<DataSet>('ui-badge', {
  data: {
    append: undefined,
    pill: undefined,
    size: 'md',
    variant: undefined
  },
  onAttributeChanged: (name, prev, curr, { dataset, root }) => {
    switch (name) {
      case 'append':
      case 'pill':
      case 'size':
      case 'variant':
        root.className = getClassName(dataset);
        break;
    }
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('span', { id: 'root', className: getClassName(dataset) }, dom('slot'))
  ]
});
