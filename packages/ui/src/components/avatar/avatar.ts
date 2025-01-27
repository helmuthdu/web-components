import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    variant?: 'circle' | 'rounded';
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('avatar', {
    [`is-${dataset.variant}`]: dataset.variant
  });

define<Props>('ui-avatar', {
  props: {
    dataset: {
      variant: undefined
    }
  },
  onAttributeChanged(_name, _prev, _curr, el) {
    el.rootElement.className = getClassName(el);
  },
  template: el => /*html*/ `
    <style>
      ::slotted(:first-child) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .avatar {
        overflow: hidden;
        border: var(--border) solid var(--color-contrast-400);
      
        &.is-circle {
          border-radius: var(--rounded-full);
        }
      
        &.is-rounded {
          border-radius: var(--rounded-lg);
        }
      }
    </style>
    <div id="root" class="${getClassName(el)}">
      <span class="text-sm">
        <slot />
      </span>
    </div>
  `
});
