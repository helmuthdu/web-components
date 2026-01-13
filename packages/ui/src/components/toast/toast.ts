import '../../elements/close-button/close-button';
import { classMap, define } from '../../utils/custom-element.util';
import style from './toast.css?raw';

export type ToastProps = {
  color?: Exclude<UIColor, 'primary' | 'warning'>;
  important?: string;
  timeout?: string;
};

type ToastState = {
  hidden: boolean;
};

const getContainer = () => {
  let container = document.getElementById('toasts');

  if (!container) {
    container = document.createElement('div');
    container.id = 'toasts';
    container.setAttribute('role', 'log');
    container.setAttribute('aria-live', 'polite');
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

define<HTMLElement, ToastProps, ToastState>('ui-toast', {
  observedAttributes: ['color', 'important', 'timeout'],
  onConnected(el) {
    const container = getContainer();

    if (!el.important) {
      el.setTimeout(() => {
        el.state.hidden = true;
      }, +el.timeout! || TOAST_TIMEOUT);
    }

    el.event('toast', 'animationend', () => {
      if (el.state.hidden) {
        el.remove();
      }
    });

    el.event('close-button', 'click', () => {
      el.fire('close');
      el.state.hidden = true;
    });

    if (el.parentElement !== container) {
      container.appendChild(el);
    }
  },
  state: {
    hidden: false,
  },
  styles: [style],
  template: (el) => {
    const hasHeader = [...el.children].some((child) => child.slot === 'header');

    return /*html*/ `
      <div id="toast" class="${classMap('toast', {
        'is-hidden': el.state.hidden,
        'is-important': !!el.important && !el.state.hidden,
      })}"
      role="${el.important ? 'alert' : 'status'}"
      aria-live="${el.important ? 'assertive' : 'polite'}"
      >
        ${
          hasHeader
            ? /*html*/ `
          <div
            class="${classMap('toast-header', {
              [`is-${el.color}`]: el.color,
            })}">
            <span
              class="${classMap('toast-header-content', {
                [`is-text-${el.color}`]: el.color,
              })}">
              <slot name="icon"></slot>
              <slot name="header"></slot>
            </span>
            <div
              class="${classMap('toast-header-extra', {
                [`is-text-${el.color}`]: el.color,
              })}">
              <span
                class="${classMap('toast-header-meta', {
                  [`is-text-${el.color}`]: el.color,
                })}">
                <slot name="meta"></slot>
              </span>
              <ui-close-button
                id="close-button"
                class="${classMap({
                  [`is-text-${el.color}`]: el.color,
                })}"
              />
            </div>
          </div>
        `
            : ''
        }
        <div
          class="${classMap('toast-content', {
            [`is-${el.color}`]: el.color,
            [`is-text-${el.color}`]: el.color,
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
