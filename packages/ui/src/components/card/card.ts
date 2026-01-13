import { classMap, define } from '../../utils/custom-element.util';
import style from './card.css?raw';

export type CardProps = { horizontal?: string };

define<HTMLElement, CardProps>('ui-card', {
  observedAttributes: ['horizontal'],
  styles: [style],
  template: (el: any) => /* html */ `
    <article class="${classMap('card', { 'is-horizontal': !!el.horizontal })}">
      <slot></slot>
    </article>
  `,
});
