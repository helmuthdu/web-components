import { define } from '../../utils/custom-element.util';

export type Props = {
  dataset: { src?: string };
};

define<Props>('ui-card-image', {
  props: {
    dataset: {
      src: undefined
    }
  },
  template: ({ dataset }) => /*html*/ `
    <style>
      :host {
        overflow: hidden;
      }
      
      .card-image {
        inline-size: var(--size-full);
        block-size: var(--size-full);
        object-fit: cover;
      }
    </style>
    <img id="root" class="card-image" src="${dataset.src}" alt="" />
  `
});
