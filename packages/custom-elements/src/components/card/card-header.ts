import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = Partial<Omit<HTMLDivElement, 'dataset'>> & {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('align-middle text-content text-xl font-medium', dataset.append);

define<Props>('ui-card-header', {
  props: {
    dataset: {
      append: undefined
    }
  },
  template: ({ dataset, classList }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('header', { className: getClassName({ dataset }) }, dom('slot'))
  ]
});
