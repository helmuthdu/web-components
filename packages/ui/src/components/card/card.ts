import { classMap, define } from '../../utils/custom-element.util';

export type Props = {
  dataset: { horizontal?: boolean };
};

const getClassName = ({ dataset }: Props) =>
  classMap('card', {
    'is-horizontal': dataset.horizontal
  });

define<Props>('ui-card', {
  props: {
    dataset: {
      horizontal: undefined
    }
  },
  template: el => /*html*/ `
    <style>
      .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-inline-size: var(--size-md);
        overflow: hidden;
        background-color: var(--color-canvas);
        border: var(--border) solid var(--color-contrast-200);
        border-radius: var(--rounded-lg);
        box-shadow: var(--shadow-lg);
      
        &.is-horizontal {
          flex-direction: row;
        }
      }
    </style>
    <div id="root" class="${getClassName(el)}">
      <slot></slot>
    </div>
  `
});
