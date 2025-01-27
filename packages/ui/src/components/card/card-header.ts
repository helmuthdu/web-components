import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-card-header', {
  template: () => /*html*/ `
    <style>
      .card-header {
        font-size: var(--text-xl);
        font-weight: var(--font-weight-medium);
        line-height: var(--line-spacing-xl);
        color: var(--color-content-body);
        vertical-align: middle;
      }
    </style>
    <header id="root" class="card-header">
      <slot />
    </header>
  `
});
