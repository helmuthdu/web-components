import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-card-footer', {
  template: () => /*html*/ `
    <style>
      .card-footer {
        display: inline-flex;
        gap: var(--size-2);
        inline-size: var(--size-full);
      }
    </style>
    <footer id="root" class="card-footer">
      <slot />
    </footer>
  `
});
