import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-box', {
  template: () => /*html*/ `
    <style>
      .box {
        display: block;
        padding: var(--size-5);
        color: var(--color-content-body);
        background-color: var(--color-canvas);
        border: var(--border) solid var(--color-contrast-200);
        border-radius: var(--rounded-lg);
      }
    </style>
    <div id="root" class="box">
      <slot></slot>
    </div>
  `
});
