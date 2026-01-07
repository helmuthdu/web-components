import { define } from '../../utils/custom-element.util';
import style from './card-image.css?raw';

export type CardImageProps = { src?: string };

define<HTMLImageElement, CardImageProps>('ui-card-image', {
  observedAttributes: ['src'],
  styles: [style],
  template: (el) => /*html*/ `
    <img class="card-image" alt="" src="${el.src}" />
  `,
});
