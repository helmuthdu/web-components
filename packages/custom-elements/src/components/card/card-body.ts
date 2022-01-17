import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = Partial<Omit<HTMLDivElement, 'dataset'>> & {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('flex flex-col gap-2 text-base text-content p-4', dataset.append);

define<Props>('ui-card-body', {
  props: {
    dataset: {
      append: undefined
    }
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('section', { className: getClassName({ dataset }) }, dom('slot'))
  ]
});
