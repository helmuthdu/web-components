/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import { CloseButton } from '../../shared/close-button/close-button';

export type Props = {
  dataset: {
    append?: string;
    variant?: 'error' | 'success' | 'info' | 'contrast' | undefined;
  };
};

const icons = {
  default: () => (
    <svg
      className="w-5 h-5 mr-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  ),
  info: () => (
    <svg
      className="w-5 h-5 mr-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  error: () => (
    <svg
      className="w-5 h-5 mr-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: () => (
    <svg
      className="w-5 h-5 mr-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
};

const getIcon = (variant: keyof typeof icons) => (icons[variant] ? icons[variant]() : icons.default());

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
      variant: undefined
    }
  },
  onConnected({ host, remove }) {
    const container = getContainer();
    if (host.parentElement !== container) {
      container.appendChild(host);
    }
    setTimeout(remove, 8000);
  },
  onAttributeChanged: (name, prev, curr, { update }) => {
    update();
  },
  template: ({ dataset, fire, remove }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <div
        className={classMap(
          'shadow-lg w-96 max-w-full text-sm pointer-events-auto rounded-lg overflow-clip animate-fade-in-down border border-neutral-400/25'
        )}>
        <div
          className={classMap(
            'flex justify-between items-center py-1 px-3',
            {
              ' border-b border-neutral-400/25': !dataset.variant || dataset.variant === 'contrast'
            },
            !dataset.variant
              ? 'bg-canvas'
              : {
                  'bg-primary': dataset.variant === 'info',
                  'bg-error': dataset.variant === 'error',
                  'bg-success': dataset.variant === 'success',
                  'bg-contrast-700': dataset.variant === 'contrast'
                }
          )}>
          <span
            className={classMap(
              'font-bold flex',
              !dataset.variant
                ? 'text-content-heading'
                : {
                    'text-primary-contrast': dataset.variant === 'info',
                    'text-error-contrast': dataset.variant === 'error',
                    'text-success-contrast': dataset.variant === 'success',
                    'text-content-contrast': dataset.variant === 'contrast'
                  }
            )}>
            {getIcon(dataset.variant as keyof typeof icons)}
            <slot name="header" />
          </span>
          <div
            className={classMap(
              'flex items-center',
              !dataset.variant
                ? 'text-content'
                : {
                    'text-primary-contrast': dataset.variant === 'info',
                    'text-error-contrast': dataset.variant === 'error',
                    'text-success-contrast': dataset.variant === 'success',
                    'text-content-contrast': dataset.variant === 'contrast'
                  }
            )}>
            <span
              className={classMap(
                'text-xs',
                !dataset.variant || dataset.variant === 'contrast'
                  ? 'text-content-tertiary'
                  : {
                      'text-primary-contrast': dataset.variant === 'info',
                      'text-error-contrast': dataset.variant === 'error',
                      'text-success-contrast': dataset.variant === 'success'
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
        <div
          className={classMap(
            'p-3 break-words',
            !dataset.variant
              ? ' bg-canvas text-content'
              : {
                  'bg-primary text-primary-contrast': dataset.variant === 'info',
                  'bg-error text-error-contrast': dataset.variant === 'error',
                  'bg-success text-success-contrast': dataset.variant === 'success',
                  'text-content-contrast bg-contrast-700': dataset.variant === 'contrast'
                }
          )}>
          <slot />
        </div>
      </div>
    </>
  )
});
