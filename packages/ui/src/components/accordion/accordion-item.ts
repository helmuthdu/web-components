import { define } from '../../utils/custom-element.util';
import style from './accordion-item.css?raw';

export type AccordionItemProps = { header: string; level?: string };

define<HTMLDetailsElement, AccordionItemProps>('ui-accordion-item', {
  observedAttributes: ['header', 'level'],
  styles: [style],
  template: (el) => /*html*/ `
    <details class="accordion-item">
      <summary part="header">
        <div role="heading" aria-level="${el.level || '3'}" style="display: inline-flex; align-items: center; gap: var(--size-2);">
          <svg fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
          </svg>
          <slot name="header"></slot>
        </div>
      </summary>
      <div part="content" role="region">
        <slot></slot>
      </div>
    </details>
  `,
});
