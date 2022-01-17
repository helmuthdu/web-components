import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = Partial<Omit<HTMLDivElement, 'dataset'>> & {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('inline-flex gap-2 w-full', dataset.append);

define<Props>('ui-card-footer', {
  props: {
    dataset: {
      append: undefined
    }
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('footer', { className: getClassName({ dataset }) }, dom('slot'))
  ]
});
