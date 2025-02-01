import { define } from '../../utils/custom-element.util';
import style from './card-image.css?raw';

export type Props = {
  dataset: { src?: string };
};

define<HTMLImageElement>('ui-card-image', {
  observedAttributes: ['data-src'],
  onAttributeChanged: (name, prev, curr, el) => {
    el.rootElement.src = el.dataset.src!;
  },
  styles: [style],
  template: (el) => /*html*/ `
    <img class="card-image" alt="" src="${el.dataset.src}" />
  `,
});
