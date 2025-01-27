import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-card-meta', {
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
      <slot />
    </span>
  `
});
