import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
  style?: 'circle' | 'rounded';
};

const getClassName = (data: DataSet) =>
  classMap(
    'overflow-hidden border border-white/30',
    {
      'rounded-full': data.style === 'circle',
      'rounded-lg': data.style === 'rounded'
    },
    data.append
  );

define<DataSet>('ui-avatar', {
  data: {
    append: undefined,
    style: 'circle'
  },
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassName(dataset);
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom(
      'style',
      {},
      `
          ::slotted(:first-child) {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `
    ),
    dom('div', { id: 'root', className: getClassName(dataset) }, dom('slot'))
  ]
});
