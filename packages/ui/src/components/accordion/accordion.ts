import { classMap, define } from '../../utils/custom-element.util';
import style from './accordion.css?raw';

type AccordionProps = {
  variant: UIVariant;
};

define<HTMLElement, AccordionProps>('ui-accordion', {
  observedAttributes: ['variant'],
  onUpdated(el) {
    for (const child of el.children) {
      if (el.variant) {
        child.setAttribute('variant', el.variant);
      } else {
        child.removeAttribute('variant');
      }
    }
  },
  styles: [style],
  template: (el) => /* html */ `
    <div class="${classMap('accordion', { [`is-${el.variant}`]: el.variant })}">
      <slot></slot>
    </div>
  `,
});
