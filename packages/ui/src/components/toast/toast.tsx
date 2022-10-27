/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import '../../common/close-button/close-button';
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

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
  onConnected({ hostElement, dataset, remove, ref }) {
    if (!dataset.fixed) {
      const container = getContainer();
      if (hostElement.parentElement !== container) {
        container.appendChild(hostElement);
      }
      setTimeout(() => {
        ref('root').classList.add('is-hidden');
        setTimeout(remove, 800);
      }, dataset.timeout);
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./toast.css')],
  template: ({ children, dataset, fire, remove, ref }) => {
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
                    ref('root').classList.add('is-hidden');
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
                    ref('root').classList.add('is-hidden');
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
