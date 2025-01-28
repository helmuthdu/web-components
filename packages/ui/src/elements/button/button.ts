import { classMap, define } from '../../utils/custom-element.util';
import loadingIcon from '../../assets/icons/loading.icon.svg?raw';

export type Props = {
  type?: 'button' | 'submit' | 'reset';
  dataset: {
    block?: boolean;
    circle?: boolean;
    disabled?: boolean;
    group?: string;
    loading?: boolean;
    rounded?: boolean;
    size?: UISizes;
    color?: Exclude<UIColor, 'warning' | 'info'>;
    variant?: 'outline' | 'text';
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('btn', {
    'is-block': dataset.block,
    'is-circle': dataset.circle,
    'is-disabled': dataset.disabled,
    'is-group': dataset.group,
    'is-first': dataset.group === 'first',
    'is-last': dataset.group === 'last',
    'is-loading': dataset.loading,
    'is-rounded': dataset.rounded,
    [`is-${dataset.color}`]: dataset.color,
    [`is-${dataset.size}`]: dataset.size,
    [`is-${dataset.variant}`]: dataset.variant
  });

define<Props, HTMLButtonElement>('ui-button', {
  props: {
    type: 'button',
    dataset: {
      block: undefined,
      circle: undefined,
      disabled: undefined,
      group: undefined,
      loading: undefined,
      rounded: undefined,
      size: undefined,
      color: undefined
    }
  },
  onAttributeChanged: (name, prev, curr, el) => {
    el.rootElement.className = getClassName(el);

    switch (name) {
      case 'data-block':
        el.style.width = el.dataset.block ? '100%' : '';
        break;
      case 'data-loading':
        if (curr === null) {
          el.rootElement.querySelector('svg')?.remove();
        } else {
          el.rootElement.prepend(new DOMParser().parseFromString(loadingIcon, 'image/svg+xml').firstChild!);
        }
        break;
      case 'data-disabled':
        el.rootElement.disabled = curr !== null;
        break;
    }
  },
  template: el => /*html*/ `
    <style>
      .btn {
        display: inline-flex;
        flex-wrap: wrap;
        gap: var(--size-2);
        align-items: center;
        justify-content: center;
        padding: var(--button-padding, var(--size-3) var(--size-5));
        font-size: var(--button-font-size, var(--text-md));
        font-weight: var(--font-weight-semibold);
        line-height: var(--button-line-height, var(--line-spacing-md));
        text-align: center;
        border: var(--border) solid transparent;
      
        & > svg {
          inline-size: var(--button-icon-size, var(--size-5));
          block-size: var(--button-icon-size, var(--size-5));
        }
      
        &.is-rounded {
          border-radius: var(--rounded-full);
        }
      
        &:not(.is-rounded, .is-group) {
          border-radius: var(--rounded-lg);
        }
      
        &.is-block {
          inline-size: var(--size-full);
        }
      
        &.is-group {
          &.is-outline {
            margin-inline: -1px 0;
          }
      
          &.is-first {
            border-start-start-radius: var(--rounded-full);
            border-end-start-radius: var(--rounded-full);
          }
      
          &.is-last {
            border-start-end-radius: var(--rounded-full);
            border-end-end-radius: var(--rounded-full);
          }
      
          &.is-first:not(.is-rounded) {
            border-start-start-radius: var(--rounded-lg);
            border-end-start-radius: var(--rounded-lg);
          }
      
          &.is-last:not(.is-rounded) {
            border-start-end-radius: var(--rounded-lg);
            border-end-end-radius: var(--rounded-lg);
          }
          
          &:hover,
          &:focus {
            border-radius: var(--rounded-full);
          }
          
          &:hover:not(.is-rounded),
          &:focus:not(.is-rounded) {
            border-radius: var(--rounded-lg);
          }
        }
      
        &.is-xs {
          --button-icon-size: var(--size-3);
          --button-padding: var(--size-1) var(--size-4);
          --button-font-size: var(--text-xs);
          --button-line-height: var(--line-spacing-xs);
        }
      
        &.is-sm {
          --button-icon-size: var(--size-4);
          --button-padding: var(--size-2) var(--size-4);
          --button-font-size: var(--text-sm);
          --button-line-height: var(--line-spacing-sm);
        }
      
        &.is-lg {
          --button-icon-size: var(--size-6);
          --button-padding: var(--size-4) var(--size-5);
          --button-font-size: var(--text-lg);
          --button-line-height: var(--line-spacing-lg);
        }
      
        &.is-xl {
          --button-icon-size: var(--size-7);
          --button-padding: var(--size-4) var(--size-7);
          --button-font-size: var(--text-xl);
          --button-line-height: var(--line-spacing-xl);
        }
      
        &.is-circle:not(.is-group) {
          inline-size: var(--button-size, var(--size-12));
          block-size: var(--button-size, var(--size-12));
          padding: 0;
          border-radius: var(--rounded-full);
      
          &.is-xs {
            --button-size: var(--size-8);
          }
      
          &.is-sm {
            --button-size: var(--size-10);
          }
      
          &.is-lg {
            --button-size: var(--size-14);
          }
      
          &.is-xl {
            --button-size: var(--size-16);
          }
        }
      
        &.is-loading {
          color: transparent;
      
          &:hover {
            color: transparent;
          }
      
          & > svg {
            position: absolute;
            color: var(--color-contrast);
            animation: spin 1s linear infinite;
          }
      
          & > svg > circle {
            opacity: 0.25;
          }
      
          & > svg > path {
            opacity: 0.75;
          }
            
          &:not(.is-primary, .is-error, .is-success) {
            & > svg {
              color: var(--color-content-contrast);
            }
          }
        }
      
        &.is-disabled {
          color: var(--color-contrast-300);
          background-color: var(--color-content-disabled);
          border: var(--border) solid transparent;
      
          &.is-loading {
            color: transparent;
      
            & > svg {
              color: var(--color-contrast-300);
            }
          }
        }
      
        &.is-outline:not(.is-text, .is-disabled) {
          --button-font-size: var(--text-md);
          --button-line-height: var(--line-spacing-md);
      
          color: var(--button-color, var(--color-contrast-900));
          background-color: transparent;
          border-color: var(--button-color, var(--color-contrast-800));
          border-width: var(--border-2);
      
          &:hover,
          &:focus {
            box-shadow: var(--ring-4) var(--button-color-ring, var(--color-contrast-800));
          }
      
          &:not(.is-circle) {
            --button-padding: var(--size-2-5) var(--size-5);
          }
      
          & > svg {
            color: var(--button-color, var(--color-contrast-700));
          }
      
          &.is-primary {
            --button-color: var(--color-primary);
            --button-color-ring: var(--color-primary-focus);
          }
      
          &.is-error {
            --button-color: var(--color-error);
            --button-color-ring: var(--color-error-focus);
          }
      
          &.is-success {
            --button-color: var(--color-success);
            --button-color-ring: var(--color-success-focus);
          }
      
          &.is-xs {
            --button-font-size: var(--text-xs);
            --button-line-height: var(--line-spacing-xs);
      
            /* stylelint-disable */
            margin-block-start: calc(0 - var(--size-1));
            /* stylelint-enable */
      
            &:not(.is-circle) {
              --button-padding: var(--size-0-5) var(--size-4);
            }
          }
      
          &.is-sm {
            --button-font-size: var(--text-sm);
            --button-line-height: var(--line-spacing-sm);
      
            &:not(.is-circle) {
              --button-padding: var(--size-1-5) var(--size-4);
            }
          }
      
          &.is-lg {
            --button-font-size: var(--text-lg);
            --button-line-height: var(--line-spacing-lg);
      
            &:not(.is-circle) {
              --button-padding: var(--size-3-5) var(--size-5);
            }
          }
      
          &.is-xl {
            --button-font-size: var(--text-xl);
            --button-line-height: var(--line-spacing-xl);
      
            &:not(.is-circle) {
              --button-padding: var(--size-3-5) var(--size-7);
            }
          }
      
          &.is-loading,
          &.is-loading:hover {
            color: transparent;
          }
        }
      
        &.is-text:not(.is-outline, .is-disabled) {
          color: var(--button-color, var(--color-contrast-900));
          background-color: transparent;
      
          &:hover {
            box-shadow: var(--ring-4) var(--button-color-ring, var(--color-contrast-800));
          }
      
          &.is-primary {
            --button-color: var(--color-primary);
            --button-color-ring: var(--color-primary-focus);
          }
      
          &.is-error {
            --button-color: var(--color-error);
            --button-color-ring: var(--color-error-focus);
          }
      
          &.is-success {
            --button-color: var(--color-success);
            --button-color-ring: var(--color-success-focus);
          }
      
          &.is-loading {
            color: transparent;
      
            & > svg {
              color: var(--button-color, var(--color-contrast-700));        
            }
          }
        }
      
        &:not(.is-text) {
          box-shadow: var(--shadow-sm);
        }
      
        &:not(.is-text, .is-outline, .is-disabled) {
          color: var(--button-color, var(--color-contrast-100));
          background-color: var(--button-background-color, var(--color-contrast));
          border: none;
      
          &:hover,
          &:focus {
            box-shadow: var(--ring-4) var(--button-color-ring, var(--color-contrast-800));
          }
      
          &.is-primary {
            --button-color: var(--color-primary-contrast);
            --button-background-color: var(--color-primary);
            --button-color-ring: var(--color-primary-focus);
          }
      
          &.is-error {
            --button-color: var(--color-error-contrast);
            --button-background-color: var(--color-error);
            --button-color-ring: var(--color-error-focus);
          }
      
          &.is-success {
            --button-color: var(--color-success-contrast);
            --button-background-color: var(--color-success);
            --button-color-ring: var(--color-success-focus);
          }
      
          &.is-loading {
            color: transparent;
          }
        }
      }
      
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
      
        to {
          transform: rotate(360deg);
        }
      }
    </style>
    <button id="root" type="${el.type}" class="${getClassName(el)}" title="${el.children[0]?.textContent ?? undefined}">
      <slot></slot>
    </button>
  `
});
