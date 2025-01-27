import { define } from '../../lib/custom-element';

export type Props = {
  dataset: { header: string };
};

define<Props, HTMLDetailsElement>('ui-accordion-item', {
  props: {
    dataset: {
      header: ''
    }
  },
  template: () => /*html*/ `
    <style>
      details svg {
        transition: transform 0.3s ease-in-out;
      }
      
      details > summary > svg {
        inline-size: var(--size-4);
        block-size: var(--size-4);
      }
      
      details[open] svg {
        transform: rotate(90deg);
      }
      
      details summary::-webkit-details-marker {
        display: none;
      }
      
      summary {
        display: flex;
        gap: var(--size-2);
        align-items: center;
        padding-block: var(--size-1);
        cursor: pointer;
      }
      
      .accordion-item {
        display: block;
        padding: var(--size-4);
        color: var(--color-content-body);
      }
    </style>
    <details id="root" class="accordion-item">
      <summary part="header">
        <svg fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
        </svg>
        <slot name="header"></slot>
      </summary>
      <div part="content">
        <slot></slot>
      </div>
    </details>
  `
});
