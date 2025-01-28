import { classMap, define } from '../../utils/custom-element.util';
import '../../elements/close-button/close-button';

export type Props = {
  dataset: {
    fixed?: boolean;
    color?: Exclude<UIColor, 'primary' | 'warning'>;
    timeout: number;
  };
};

const getContainer = () => {
  let container = document.getElementById('toasts');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toasts';
    Object.assign(container.style, {
      display: 'flex',
      flexDirection: 'column-reverse',
      gap: 'var(--size-2)',
      insetBlockEnd: 0,
      insetInlineEnd: 0,
      maxBlockSize: 'var(--size-screen-height)',
      overflow: 'hidden',
      padding: 'var(--size-4)',
      position: 'fixed',
      zIndex: 2
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
  onConnected(el) {
    if (!el.dataset.fixed) {
      const container = getContainer();
      if (el.parentElement !== container) {
        setTimeout(() => {
          el.rootElement.addEventListener('animationend', () => {
            el.remove();
          });
          el.rootElement.classList.add('is-hidden');
        }, el.dataset.timeout);

        container.appendChild(el.node);
      }
    }

    el.event('close-button', 'click', () => {
      el.fire('close');
      el.rootElement.addEventListener('animationend', () => {
        el.remove();
      });
      el.rootElement.classList.add('is-hidden');
    });
  },
  template: el => {
    const hasHeader = [...el.children].some(child => child.slot === 'header');
    return /*html*/ `
      <style>
        .toast {
          inline-size: var(--size-96);
          max-inline-size: var(--size-full);
          overflow: clip;
          font-size: var(--text-sm);
          line-height: var(--line-spacing-sm);
          pointer-events: auto;
          border: var(--border) solid var(--color-contrast-200);
          border-radius: var(--rounded-lg);
          box-shadow: var(--shadow-lg);
          animation: bounce-in-left 0.7s ease-in;

          &.is-hidden {
            animation: bounce-out-left 0.7s ease-in;
          }
        }

        .toast-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-block: var(--size-1);
          padding-inline: var(--size-3);

          &:not(.is-info, .is-error, .is-success, .is-contrast) {
            background-color: var(--color-canvas);
            border-block-end: var(--border) solid var(--color-contrast-300);
          }
        }

        .toast-header-content {
          display: flex;
          flex-direction: row;
          gap: var(--size-2);
          align-items: center;
          justify-content: space-between;
          font-weight: var(--font-weight-bold);

          &:not(.is-text-info, .is-text-error, .is-text-success, .is-text-contrast) {
            color: var(--color-content-heading);
          }
        }

        .toast-header-extra {
          display: flex;
          align-items: center;

          &:not(.is-info, .is-error, .is-success, .is-contrast) {
            color: var(--color-content-body);
          }
        }

        .toast-header-meta {
          font-size: var(--text-xs);
          line-height: var(--line-spacing-xs);

          &:not(.is-text-info, .is-text-error, .is-text-success) {
            color: var(--color-content-tertiary);
          }

          &.is-text-contrast {
            color: var(--color-content-secondary););
          }
        }

        .toast-content {
          padding: var(--size-3);
          overflow-wrap: break-word;

          &:not(.is-info, .is-error, .is-success, .is-contrast) {
            color: var(--color-content-body);
            background-color: var(--color-canvas);
          }

          &.is-headless {
            display: flex;
            flex-direction: row;
            gap: var(--size-3);
            align-items: center;
            justify-content: space-between;
          }
        }

        .is-info {
          background-color: var(--color-primary);
        }

        .is-error {
          background-color: var(--color-error);
        }

        .is-success {
          background-color: var(--color-success);
        }

        .is-contrast {
          background-color: var(--color-contrast-900);
        }

        .is-text-info {
          color: var(--color-primary-contrast);
        }

        .is-text-error {
          color: var(--color-error-contrast);
        }

        .is-text-success {
          color: var(--color-success-contrast);
        }

        .is-text-contrast {
          color: var(--color-content-contrast);
        }

        @keyframes bounce-in-left {
          0% {
            opacity: 0;
            transform: translate3d(200%, 0, 0);
          }

          55% {
            opacity: 1;
            transform: translate3d(20px, 0, 0);
          }

          75% {
            transform: translate3d(-10px, 0, 0);
          }

          90% {
            transform: translate3d(5px, 0, 0);
          }

          100% {
            transform: none;
          }
        }

        @keyframes bounce-out-left {
          10% {
            opacity: 1;
            transform: translate3d(-20px, 0, 0);
          }

          100% {
            opacity: 0;
            transform: translate3d(200%, 0, 0);
          }
        }
      </style>
      <div id="root" class="toast">
        ${
          hasHeader
            ? /*html*/ `
          <div
            class="${classMap('toast-header', {
              [`is-${el.dataset.color}`]: el.dataset.color
            })}">
            <span
              class="${classMap('toast-header-content', {
                [`is-text-${el.dataset.color}`]: el.dataset.color
              })}">
              <slot name="icon"></slot>
              <slot name="header"></slot>
            </span>
            <div
              class="${classMap('toast-header-extra', {
                [`is-text-${el.dataset.color}`]: el.dataset.color
              })}">
              <span
                class="${classMap('toast-header-meta', {
                  [`is-text-${el.dataset.color}`]: el.dataset.color
                })}">
                <slot name="meta"></slot>
              </span>
              <ui-close-button
                id="close-button"
                class="${classMap({
                  [`is-text-${el.dataset.color}`]: el.dataset.color
                })}"
              />
            </div>
          </div>
        `
            : ''
        }
        <div
          class="${classMap('toast-content', {
            'is-headless': !hasHeader,
            [`is-${el.dataset.color}`]: el.dataset.color,
            [`is-text-${el.dataset.color}`]: el.dataset.color
          })}">
          ${
            hasHeader
              ? /*html*/ '<slot></slot>'
              : /*html*/ `
                <slot name="icon"></slot>
                <slot></slot>
                <ui-close-button id="close-button" />
              `
          }
        </div>
      </div>
    `;
  }
});
