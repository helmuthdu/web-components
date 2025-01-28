import { define } from '../../utils/custom-element.util';

define('ui-card-meta', {
  template: () => /*html*/ `
    <style>
      .card-meta {
        display: block;
        font-size: var(--text-sm);
        line-height: var(--line-spacing-sm);
        color: var(--color-content-tertiary);
      }
    </style>
    <span id="root" class="card-meta">
      <slot></slot>
    </span>
  `
});
