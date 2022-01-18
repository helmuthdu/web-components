import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('block text-sm text-content-tertiary', dataset.append);

define<Props>('ui-card-meta', {
  props: {
    dataset: {
      append: undefined
    }
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('span', { className: getClassName({ dataset }) }, dom('slot'))
  ]
});
