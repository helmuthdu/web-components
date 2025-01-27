import { classMap, define } from '../../lib/custom-element';
import type { Sizes } from '../../types';

export type Props = {
  dataset: {
    color?: 'error' | 'success' | 'info' | 'contrast' | undefined;
    pill?: boolean;
    size?: Sizes;
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('badge', {
    'is-pill': dataset.pill,
    [`is-${dataset.size}`]: dataset.size,
    [`is-${dataset.color}`]: dataset.color
  });

define<Props>('ui-badge', {
  props: {
    dataset: {
      pill: undefined,
      size: 'md',
      color: undefined
    }
  },
  onAttributeChanged: (name, prev, curr, el) => {
    switch (name) {
      case 'data-color':
      case 'data-pill':
      case 'data-size':
        el.rootElement.className = getClassName(el);
        break;
    }
  },
  template: el => /*html*/ `
    <style>
      .badge {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding-block: var(--badge-padding-block, var(--size-1));
        padding-inline: var(--badge-padding-inline, var(--size-2-5));
        font-size: var(--badge-font-size, var(--text-md));
        font-weight: var(--font-weight-semibold);
        line-height: var(--badge-line-height, var(--line-spacing-md));
        color: var(--badge-color, var(--color-content-body));
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        background-color: var(--badge-background-color, var(--color-contrast-50));
        border: var(--badge-border, var(--border) solid var(--color-contrast-200));
        border-radius: var(--badge-border-radius, var(--rounded-lg));
      
        &.is-pill {
          --badge-border-radius: var(--rounded-full);
        }
      
        &.is-xs {
          --badge-padding-block: var(--size-0-5);
          --badge-padding-inline: var(--size-2);
          --badge-font-size: var(--text-xs);
          --badge-line-height: var(--line-spacing-xs);
        }
      
        &.is-sm {
          --badge-padding-block: var(--size-0-5);
          --badge-padding-inline: var(--size-2);
          --badge-font-size: var(--text-sm);
          --badge-line-height: var(--line-spacing-sm);
        }
      
        &.is-lg {
          --badge-padding-block: var(--size-1);
          --badge-padding-inline: var(--size-3);
          --badge-font-size: var(--text-lg);
          --badge-line-height: var(--line-spacing-lg);
        }
      
        &.is-xl {
          --badge-padding-block: var(--size-1);
          --badge-padding-inline: var(--size-3);
          --badge-font-size: var(--text-xl);
          --badge-line-height: var(--line-spacing-xl);
        }
      
        &.is-info {
          --badge-border: var(--border) solid var(--color-primary-focus);
          --badge-background-color: var(--color-primary);
          --badge-color: var(--color-primary-contrast);
        }
      
        &.is-error {
          --badge-border: var(--border) solid var(--color-error-focus);
          --badge-background-color: var(--color-error);
          --badge-color: var(--color-error-contrast);
        }
      
        &.is-success {
          --badge-border: var(--border) solid var(--color-success-focus);
          --badge-background-color: var(--color-success);
          --badge-color: var(--color-success-contrast);
        }
      
        &.is-contrast {
          --badge-border: var(--border) solid var(--color-contrast-800);
          --badge-background-color: var(--color-contrast-700);
          --badge-color: var(--color-content-contrast);
        }
      }
    </style>
    <span id="root" class="${getClassName(el)}">
      <slot></slot>
    </span>
  `
});
