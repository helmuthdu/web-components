import { classMap, define } from '../../lib/custom-element';
import '../../elements/close-button/close-button';

export type Props = {
  dataset: { color?: 'warning' | 'error' | 'success' | 'info' | 'contrast' | undefined };
};

const getClassName = ({ dataset }: Props) =>
  classMap('alert', {
    [`is-${dataset.color}`]: dataset.color
  });

define<Props>('ui-alert', {
  props: {
    dataset: {
      color: undefined
    }
  },
  onConnected(el) {
    el.event('close-button', 'click', () => {
      el.fire('close');
      el.remove();
    });
  },
  onAttributeChanged(name, prev, curr, el) {
    el.rootElement.className = getClassName(el);
  },
  template: el => /*html*/ `
    <style>
      .alert {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-block: var(--size-2);
        padding-inline: var(--size-4) var(--size-3);
        font-size: var(--text-xs);
        line-height: var(--line-spacing-xs);
        color: var(--alert-color, var(--color-content-body));
        background-color: var(--alert-background-color, var(--color-canvas));
        border: var(--border) solid var(--alert-border-color, var(--color-contrast-300));
        border-radius: var(--rounded-xl);
        box-shadow: var(--shadow-sm);
      
        & > span {
          font-size: var(--text-sm);
          line-height: var(--line-spacing-sm);
        }
      
        &.is-info {
          --alert-border-color: var(--color-primary-focus);
          --alert-background-color: var(--color-primary-backdrop);
          --alert-color: var(--color-primary-content);
        }
      
        &.is-warning {
          --alert-border-color: var(--color-warning-focus);
          --alert-background-color: var(--color-warning-backdrop);
          --alert-color: var(--color-warning-content);
        }
      
        &.is-error {
          --alert-border-color: var(--color-error-focus);
          --alert-background-color: var(--color-error-backdrop);
          --alert-color: var(--color-error-content);
        }
      
        &.is-success {
          --alert-border-color: var(--color-success-focus);
          --alert-background-color: var(--color-success-backdrop);
          --alert-color: var(--color-success-content);
        }
      
        &.is-contrast {
          --alert-border-color: var(--color-contrast-600);
          --alert-background-color: var(--color-contrast-900);
          --alert-color: var(--color-content-contrast);
        }
      }
    </style>
    <div id="root" class="${getClassName(el)}">
      <span>
        <slot></slot>
      </span>
      <ui-close-button id="close-button" />
    </div>
  `
});
