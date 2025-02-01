import { classMap, define } from '../../utils/custom-element.util';
import style from './card.css?raw';

export type Props = {
  dataset: { horizontal?: string };
};

const getClassName = ({ dataset }: Props) =>
  classMap('card', {
    'is-horizontal': dataset.horizontal === '',
  });

define('ui-card', {
  observedAttributes: ['data-horizontal'],
  onAttributeChanged: (name, prev, curr, el) => {
    el.rootElement.className = getClassName(el);
  },
  styles: [style],
  template: (el) => /* html */ `
    <div class="${getClassName(el)}">
      <slot></slot>
    </div>
  `,
});
