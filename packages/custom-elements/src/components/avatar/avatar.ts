import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    append?: string;
    style?: 'circle' | 'rounded';
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'overflow-hidden border border-white/30',
    {
      'rounded-full': dataset.style === 'circle',
      'rounded-lg': dataset.style === 'rounded'
    },
    dataset.append
  );

define<Props>('ui-avatar', {
  props: {
    dataset: {
      append: undefined,
      style: 'circle'
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassName({ dataset });
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('style', {}, `::slotted(:first-child) { display: flex; justify-content: center; align-items: center; }`),
    dom('div', { id: 'root', className: getClassName({ dataset }) }, dom('slot'))
  ]
});
