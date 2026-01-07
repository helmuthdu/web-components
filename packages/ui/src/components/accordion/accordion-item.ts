import { define } from '../../utils/custom-element.util';
import style from './accordion-item.css?raw';

export type AccordionItemProps = { header: string };

define<HTMLDetailsElement, AccordionItemProps>('ui-accordion-item', {
  observedAttributes: ['header'],
  styles: [style],
  template: () => /*html*/ `
    <details class="accordion-item">
      <summary part="header">
        <svg fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        </svg>
        <slot name="header"></slot>
      </summary>
      <div part="content">
        <slot></slot>
      </div>
    </details>
  `,
});
