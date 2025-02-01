import { classMap, define } from '../../utils/custom-element.util';
import style from './carousel-image.css?raw';

export type Props = {
  dataset: {
    src?: string;
    textAlign?: 'left' | 'center' | 'right';
    textPosition?: 'top' | 'middle' | 'bottom';
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('carousel-text', {
    [`is-${dataset.textAlign}`]: dataset.textAlign,
    [`is-${dataset.textPosition}`]: dataset.textPosition,
  });

define('ui-carousel-image', {
  onConnected: (el) => {
    el.classList.add('carousel-image');
  },
  styles: [style],
  template: (el) => /*html*/ `
    <img class="carousel-img" alt="" src="${el.dataset.src}" />
    <div class="${getClassName(el)}">
      <slot></slot>
    </div>
  `,
});
