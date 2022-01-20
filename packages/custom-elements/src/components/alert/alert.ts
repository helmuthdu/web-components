import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import { closeButton } from '../../shared/close-button/close-button';

export type Props = {
  dataset: { append?: string; variant?: 'error' | 'success' | 'info' | 'contrast' | undefined };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'flex justify-between items-center py-2 pl-4 pr-3 text-sm border rounded-xl shadow-sm',
    !dataset.variant
      ? 'text-content bg-contrast-50 border-contrast-200'
      : {
          'text-primary-content bg-primary-backdrop border-primary-focus': dataset.variant === 'info',
          'text-error-content bg-error-backdrop border-error-focus': dataset.variant === 'error',
          'text-success-content bg-success-backdrop border-success-focus': dataset.variant === 'success',
          'text-contrast-50 bg-contrast-800 border-contrast-700': dataset.variant === 'contrast'
        },
    dataset.append
  );

define<Props>('ui-alert', {
  props: {
    dataset: {
      append: undefined,
      variant: undefined
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassName({ dataset });
  },
  template: ({ dataset, fire, remove }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom(
      'div',
      { id: 'root', className: getClassName({ dataset }) },
      dom('span', { className: 'text-sm' }, dom('slot')),
      closeButton(() => {
        fire('close');
        remove();
      })
    )
  ]
});
