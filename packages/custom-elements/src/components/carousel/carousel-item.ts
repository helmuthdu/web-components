import { dom } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = {
  dataset: { appendClass?: string; src: string };
};

define<Props>('ui-carousel-item', {
  props: {
    dataset: {
      src: ''
    }
  },
  onConnected: ({ classList }) => {
    classList.add('absolute', 'first:relative', 'w-full', 'transition-opacity', 'duration-1000', 'ease-in');
  },
  template: ({ dataset, shadowRoot }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('img', {
      src: dataset.src,
      className: 'block relative w-full',
      alt: ''
    }),
    dom('div', { className: 'hidden md:block absolute inset-x-0 bottom-0 text-center pb-8' }, dom('slot'))
  ]
});
