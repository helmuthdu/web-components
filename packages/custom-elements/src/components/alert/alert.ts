import { dom, rawHtml } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = Partial<Omit<HTMLDivElement, 'dataset'>> & {
  dataset: { append?: string; variant?: 'error' | 'success' | 'info' | 'contrast' | undefined };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'flex justify-between items-center py-2 px-4 text-sm border rounded-xl shadow-sm',
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
      dom(
        'button',
        {
          id: 'button',
          type: 'button',
          dataset: { collapseToggle: 'alert' },
          className: 'inline-flex items-center justify-center ml-2 -mr-2 p-0.5 h-8 w-8 text-current',
          ariaLabel: 'close',
          onclick: () => {
            fire('close');
            remove();
          }
        },
        dom('span', { className: 'sr-only' }, 'close'),
        rawHtml(
          `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`
        )
      )
    )
  ]
});
