import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string; url?: string };
};

const getClassName = ({ dataset }: Props) => classMap('w-auto h-full object-cover', dataset.append);

define<Props>('ui-card-image', {
  props: {
    dataset: {
      append: undefined,
      url: undefined
    }
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('img', { className: getClassName({ dataset }), src: dataset.url, alt: '' }, dom('slot'))
  ]
});
