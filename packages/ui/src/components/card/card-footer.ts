import { define } from '../../utils/custom-element.util';

define('ui-card-footer', {
  template: () => /*html*/ `
    <style>
      .card-footer {
        display: inline-flex;
        gap: var(--size-3-5);
        inline-size: var(--size-full);
        margin-top: var(--size-3);
      }
    </style>
    <footer id="root" class="card-footer">
      <slot></slot>
    </footer>
  `
});
