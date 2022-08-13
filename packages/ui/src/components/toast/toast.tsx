/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import '../../common/close-button/close-button';

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
      className: 'toast-wrapper'
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
  onConnected({ hostElement, dataset, remove }) {
    if (!dataset.fixed) {
      const container = getContainer();
      if (hostElement.parentElement !== container) {
        container.appendChild(hostElement);
      }
      setTimeout(remove, dataset.timeout);
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./toast.css')],
  template: ({ children, dataset, fire, remove }) => {
    const hasHeader = [...children].some(child => child.slot === 'header');
    return (
      <>
        <link rel="stylesheet" href="/styles.css" />
        <div className={classMap('toast')}>
          {hasHeader && (
            <div
              className={classMap('toast-header', {
                [`toast-${dataset.color}`]: dataset.color
              })}>
              <span
                className={classMap('toast-header-content', {
                  [`toast-text-${dataset.color}`]: dataset.color
                })}>
                <slot name="icon" />
                <slot name="header" />
              </span>
              <div
                className={classMap('toast-header-panel', {
                  [`toast-text-${dataset.color}`]: dataset.color
                })}>
                <span
                  className={classMap('toast-header-meta', {
                    [`toast-text-${dataset.color}`]: dataset.color
                  })}>
                  <slot name="meta" />
                </span>
                <ui-close-button
                  className={classMap({
                    [`toast-text-${dataset.color}`]: dataset.color
                  })}
                  onClick={() => {
                    fire('close');
                    remove();
                  }}
                />
              </div>
            </div>
          )}
          <div
            className={classMap('toast-content', {
              'toast-content-headless': !hasHeader,
              [`toast-${dataset.color}`]: dataset.color,
              [`toast-text-${dataset.color}`]: dataset.color
            })}>
            {!hasHeader ? (
              <>
                <slot name="icon" />
                <slot />
                <ui-close-button
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
