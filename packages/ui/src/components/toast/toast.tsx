/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import '../../common/close-button/close-button';

export type Props = {
  dataset: {
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
      fixed: undefined,
      timeout: 8000,
      color: undefined
    }
  },
  onConnected({ hostElement, dataset, remove, spot }) {
    if (!dataset.fixed) {
      const container = getContainer();
      if (hostElement.parentElement !== container) {
        container.appendChild(hostElement);
      }
      setTimeout(() => {
        spot('root').classList.add('is-hidden');
        setTimeout(remove, 800);
      }, dataset.timeout);
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./toast.css')],
  template: ({ children, dataset, fire, remove, spot }) => {
    const hasHeader = [...children].some(child => child.slot === 'header');
    return (
      <>
        <div id="root" className={classMap('toast')}>
          {hasHeader && (
            <div
              className={classMap('toast-header', {
                [`is-${dataset.color}`]: dataset.color
              })}>
              <span
                className={classMap('toast-header-content', {
                  [`is-text-${dataset.color}`]: dataset.color
                })}>
                <slot name="icon" />
                <slot name="header" />
              </span>
              <div
                className={classMap('toast-header-extra', {
                  [`is-text-${dataset.color}`]: dataset.color
                })}>
                <span
                  className={classMap('toast-header-meta', {
                    [`is-text-${dataset.color}`]: dataset.color
                  })}>
                  <slot name="meta" />
                </span>
                <ui-close-button
                  className={classMap({
                    [`is-text-${dataset.color}`]: dataset.color
                  })}
                  onClick={() => {
                    fire('close');
                    spot('root').classList.add('is-hidden');
                    setTimeout(remove, 500);
                  }}
                />
              </div>
            </div>
          )}
          <div
            className={classMap('toast-content', {
              'is-headless': !hasHeader,
              [`is-${dataset.color}`]: dataset.color,
              [`is-text-${dataset.color}`]: dataset.color
            })}>
            {!hasHeader ? (
              <>
                <slot name="icon" />
                <slot />
                <ui-close-button
                  onClick={() => {
                    fire('close');
                    spot('root').classList.add('is-hidden');
                    setTimeout(remove, 500);
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
