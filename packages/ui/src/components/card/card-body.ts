import { define } from '../../utils/custom-element.util';

define('ui-card-body', {
  template: () => /* html */ `
    <style>
      .card-body {
        display: flex;
        flex-direction: column;
        gap: var(--size-2);
        padding: var(--size-4);
        font-size: var(--text-md);
        line-height: var(--line-spacing-md);
        color: var(--color-content-body);
      }
    </style>
    <section id="root" class="card-body">
      <slot></slot>
    </section>
  `
});
