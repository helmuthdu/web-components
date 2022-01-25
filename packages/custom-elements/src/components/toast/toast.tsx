/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import { CloseButton } from '../../shared/close-button/close-button';

export type Props = {
  dataset: {
    append?: string;
    fixed?: boolean;
    color: 'error' | 'success' | 'info' | 'contrast' | undefined;
    timeout: number;
  };
};

const getContainer = () => {
  let container: any = document.getElementById('toasts');
  if (!container) {
    container = dom('div', {
      id: 'toasts',
      className: 'absolute top-0 right-0 p-4 flex flex-col gap-2 max-h-screen overflow-hidden'
    });
    document.body.appendChild(container);
  }
  return container;
};

define<Props>('ui-toast', {
  props: {
    dataset: {
      append: undefined,
      fixed: undefined,
      timeout: 8000,
      color: undefined
    }
  },
  onConnected({ host, dataset, remove }) {
    if (!dataset.fixed) {
      const container = getContainer();
      if (host.parentElement !== container) {
        container.appendChild(host);
      }
      setTimeout(remove, dataset.timeout);
    }
  },
  onAttributeChanged: (name, prev, curr, { update }) => {
    update();
  },
  template: ({ children, dataset, fire, remove }) => {
    const hasHeader = [...children].some(child => child.slot === 'header');
    return (
      <>
        <link rel="stylesheet" href="/tailwind.css" />
        <div
          className={classMap(
            'pointer-events-auto w-96 max-w-full animate-fade-in-down overflow-clip rounded-lg border border-neutral-400/25 text-sm shadow-lg'
          )}>
          {hasHeader && (
            <div
              className={classMap(
                'flex items-center justify-between py-1 px-3',
                {
                  ' border-b border-neutral-400/25': !dataset.color || dataset.color === 'contrast'
                },
                !dataset.color
                  ? 'bg-canvas'
                  : {
                      'bg-primary': dataset.color === 'info',
                      'bg-error': dataset.color === 'error',
                      'bg-success': dataset.color === 'success',
                      'bg-contrast-700': dataset.color === 'contrast'
                    }
              )}>
              <span
                className={classMap(
                  'flex flex-row items-center justify-between gap-2 font-bold',
                  !dataset.color
                    ? 'text-content-heading'
                    : {
                        'text-primary-contrast': dataset.color === 'info',
                        'text-error-contrast': dataset.color === 'error',
                        'text-success-contrast': dataset.color === 'success',
                        'text-content-contrast': dataset.color === 'contrast'
                      }
                )}>
                <slot name="icon" />
                <slot name="header" />
              </span>
              <div
                className={classMap(
                  'flex items-center',
                  !dataset.color
                    ? 'text-content'
                    : {
                        'text-primary-contrast': dataset.color === 'info',
                        'text-error-contrast': dataset.color === 'error',
                        'text-success-contrast': dataset.color === 'success',
                        'text-content-contrast': dataset.color === 'contrast'
                      }
                )}>
                <span
                  className={classMap(
                    'text-xs',
                    !dataset.color || dataset.color === 'contrast'
                      ? 'text-content-tertiary'
                      : {
                          'text-primary-contrast': dataset.color === 'info',
                          'text-error-contrast': dataset.color === 'error',
                          'text-success-contrast': dataset.color === 'success'
                        }
                  )}>
                  <slot name="meta" />
                </span>
                <CloseButton
                  onClick={() => {
                    fire('close');
                    remove();
                  }}
                />
              </div>
            </div>
          )}
          <div
            className={classMap(
              'break-words',
              {
                'p-3': hasHeader,
                'flex flex-row items-center justify-between gap-3 p-3': !hasHeader
              },
              !dataset.color
                ? ' bg-canvas text-content'
                : {
                    'bg-primary text-primary-contrast': dataset.color === 'info',
                    'bg-error text-error-contrast': dataset.color === 'error',
                    'bg-success text-success-contrast': dataset.color === 'success',
                    'bg-contrast-700 text-content-contrast': dataset.color === 'contrast'
                  }
            )}>
            {!hasHeader ? (
              <>
                <slot name="icon" />
                <div className="grow">
                  <slot />
                </div>
                <CloseButton
                  className=""
                  onClick={() => {
                    fire('close');
                    remove();
                  }}
                />
              </>
            ) : (
              <slot />
            )}
          </div>
        </div>
      </>
    );
  }
});
