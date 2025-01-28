import { classMap, define } from '../../utils/custom-element.util';

export type Props = {
  dataset: {
    textPosition?: 'top' | 'middle' | 'bottom';
    textAlign?: 'left' | 'center' | 'right';
    src: string;
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('carousel-text', {
    [`is-${dataset.textPosition}`]: dataset.textPosition,
    [`is-${dataset.textAlign}`]: dataset.textAlign
  });

define<Props>('ui-carousel-image', {
  props: {
    dataset: {
      src: '',
      textAlign: 'center',
      textPosition: 'bottom'
    }
  },
  onConnected: el => {
    el.classList.add('carousel-image');
  },
  template: el => /*html*/ `
    <style>
      .carousel-img {
        position: relative;
        display: block;
        inline-size: var(--size-full);
      }
      
      .carousel-text {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        padding-block: var(--size-8);
        padding-inline: var(--size-12);
      
        &.is-top {
          justify-content: start;
        }
      
        &.is-middle {
          justify-content: center;
        }
      
        &.is-bottom {
          justify-content: end;
        }
      
        &.is-left {
          text-align: start;
        }
      
        &.is-center {
          text-align: center;
        }
      
        &.is-right {
          text-align: end;
        }
      }
    </style>
    <img class="carousel-img" src="${el.dataset.src}" alt="" />
    <div id="root" class="${getClassName(el)}">
      <slot></slot>
    </div>
  `
});
