import { classMap, define } from '../../utils/custom-element.util';
import '../../elements/close-button/close-button';

export type Props = {
  dataset: { color?: Exclude<UIColor, 'primary'> };
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
        color: var(--alert-color, var(--color-contrast-900));
        background-color: var(--alert-background-color, var(--color-contrast-50));
        border: var(--border) solid var(--alert-border-color, var(--color-contrast-700));
        border-radius: var(--rounded-xl);
        box-shadow: var(--shadow-sm);

        & > span {
          font-size: var(--text-sm);
          line-height: var(--line-spacing-sm);
        }

        &.is-info {
          --alert-color: var(--color-primary-content);
          --alert-background-color: var(--color-primary-backdrop);
          --alert-border-color: var(--color-primary-focus);
        }

        &.is-warning {
          --alert-color: var(--color-warning-content);
          --alert-background-color: var(--color-warning-backdrop);
          --alert-border-color: var(--color-warning-focus);
        }

        &.is-error {
          --alert-color: var(--color-error-content);
          --alert-background-color: var(--color-error-backdrop);
          --alert-border-color: var(--color-error-focus);
        }

        &.is-success {
          --alert-color: var(--color-success-content);
          --alert-background-color: var(--color-success-backdrop);
          --alert-border-color: var(--color-success-focus);
        }

        &.is-contrast {
          --alert-color: var(--color-contrast-50);
          --alert-background-color: var(--color-contrast-900);
          --alert-border-color: var(--color-contrast-300);
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
