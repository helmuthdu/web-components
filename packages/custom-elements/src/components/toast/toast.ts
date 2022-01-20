import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import { closeButton } from '../../shared/close-button/close-button';

export type Props = {
  dataset: {
    append?: string;
    variant?: 'error' | 'success' | 'info' | 'contrast' | undefined;
  };
};

define<Props>('ui-toast', {
  props: {
    dataset: {
      variant: undefined
    }
  },
  template: ({ dataset, fire, remove }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom(
      'div',
      { id: 'root', className: 'absolute top-4 right-4 flex space-x-2 justify-center animate-fade-in-down' },
      dom(
        'div',
        {
          className: classMap(
            'shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block border',
            !dataset.variant
              ? 'border-contrast-200'
              : {
                  'border-primary-focus': dataset.variant === 'info',
                  'border-error-focus': dataset.variant === 'error',
                  'border-success-focus': dataset.variant === 'success',
                  'border-contrast-700': dataset.variant === 'contrast'
                }
          )
        },
        dom(
          'div',
          {
            className: classMap(
              'flex justify-between items-center py-1 px-3 bg-clip-padding rounded-t-lg',
              !dataset.variant
                ? 'bg-canvas'
                : {
                    'bg-primary': dataset.variant === 'info',
                    'bg-error': dataset.variant === 'error',
                    'bg-success': dataset.variant === 'success',
                    'bg-contrast-800': dataset.variant === 'contrast'
                  }
            )
          },
          dom(
            'p',
            {
              className: classMap(
                'font-bold',
                !dataset.variant
                  ? 'text-content-heading'
                  : {
                      'text-primary-contrast': dataset.variant === 'info',
                      'text-error-contrast': dataset.variant === 'error',
                      'text-success-contrast': dataset.variant === 'success',
                      'text-contrast-50': dataset.variant === 'contrast'
                    }
              )
            },
            'Super Toast'
          ),
          dom(
            'div',
            {
              className: classMap(
                'flex items-center',
                !dataset.variant
                  ? 'text-content'
                  : {
                      'text-primary-contrast': dataset.variant === 'info',
                      'text-error-contrast': dataset.variant === 'error',
                      'text-success-contrast': dataset.variant === 'success',
                      'text-contrast-50': dataset.variant === 'contrast'
                    }
              )
            },
            dom(
              'p',
              {
                className: classMap(
                  'text-xs',
                  !dataset.variant
                    ? 'text-content-tertiary'
                    : {
                        'text-primary-focus': dataset.variant === 'info',
                        'text-error-focus': dataset.variant === 'error',
                        'text-success-focus': dataset.variant === 'success',
                        'text-contrast-800': dataset.variant === 'contrast'
                      }
                )
              },
              '11 min ago'
            ),
            closeButton(() => {
              fire('close');
              remove();
            })
          )
        ),
        dom(
          'div',
          {
            className: classMap(
              'p-3 rounded-b-lg break-words',
              !dataset.variant
                ? ' bg-canvas text-content'
                : {
                    'bg-primary text-primary-contrast': dataset.variant === 'info',
                    'bg-error text-error-contrast': dataset.variant === 'error',
                    'bg-success text-success-contrast': dataset.variant === 'success',
                    'text-contrast-50 bg-contrast-800': dataset.variant === 'contrast'
                  }
            )
          },
          'Static Example'
        )
      )
    )
  ]
});
