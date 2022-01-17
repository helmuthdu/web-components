import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = Partial<Omit<HTMLDivElement, 'dataset'>> & {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('inline-flex items-center flex-wrap', dataset.append);

define<Props>('ui-avatar-group', {
  props: {
    dataset: {
      append: undefined
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassName({ dataset });
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('div', { id: 'root', className: getClassName({ dataset }) }, dom('slot'))
  ]
});
