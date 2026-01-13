import { classMap, define } from '../../utils/custom-element.util';
import style from './carousel-image.css?raw';

type CarouselImageProps = {
  alt?: string;
  src?: string;
  textAlign?: 'left' | 'center' | 'right';
  textPosition?: 'top' | 'middle' | 'bottom';
};

define<HTMLElement, CarouselImageProps>('ui-carousel-image', {
  observedAttributes: ['src', 'text-align', 'text-position', 'alt'],
  onConnected: (el) => {
    el.classList.add('carousel-image');
  },
  styles: [style],
  template: (el) => /*html*/ `
    <img class="carousel-img" alt="${el.alt || ''}" src="${el.src}" />
    <div class="${classMap('carousel-text', {
      [`is-${el.textAlign}`]: el.textAlign,
      [`is-${el.textPosition}`]: el.textPosition,
    })}">
      <slot></slot>
    </div>
  `,
});
