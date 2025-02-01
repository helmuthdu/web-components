import '../../elements/close-button/close-button';
import { classMap, define } from '../../utils/custom-element.util';
import style from './toast.css?raw';

export type Props = {
  dataset: {
    color?: Exclude<UIColor, 'primary' | 'warning'>;
    fixed?: string;
    timeout?: string;
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
      zIndex: 2,
    });
    document.body.appendChild(container);
  }

  return container;
};

const TOAST_TIMEOUT = 8000;

define('ui-toast', {
  onConnected(el) {
    if (el.dataset.fixed !== '') {
      const container = getContainer();

      if (el.parentElement !== container) {
        setTimeout(() => {
          el.rootElement.addEventListener('animationend', () => {
            el.remove();
          });
          el.rootElement.classList.add('is-hidden');
        }, +el.dataset.timeout! || TOAST_TIMEOUT);

        container.appendChild(el);
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
  styles: [style],
  template: (el) => {
    const hasHeader = [...el.children].some((child) => child.slot === 'header');

    return /*html*/ `
      <div class="toast">
        ${
          hasHeader
            ? /*html*/ `
          <div
            class="${classMap('toast-header', {
              [`is-${el.dataset.color}`]: el.dataset.color,
            })}">
            <span
              class="${classMap('toast-header-content', {
                [`is-text-${el.dataset.color}`]: el.dataset.color,
              })}">
              <slot name="icon"></slot>
              <slot name="header"></slot>
            </span>
            <div
              class="${classMap('toast-header-extra', {
                [`is-text-${el.dataset.color}`]: el.dataset.color,
              })}">
              <span
                class="${classMap('toast-header-meta', {
                  [`is-text-${el.dataset.color}`]: el.dataset.color,
                })}">
                <slot name="meta"></slot>
              </span>
              <ui-close-button
                id="close-button"
                class="${classMap({
                  [`is-text-${el.dataset.color}`]: el.dataset.color,
                })}"
              />
            </div>
          </div>
        `
            : ''
        }
        <div
          class="${classMap('toast-content', {
            [`is-${el.dataset.color}`]: el.dataset.color,
            [`is-text-${el.dataset.color}`]: el.dataset.color,
            'is-headless': !hasHeader,
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
  },
});
