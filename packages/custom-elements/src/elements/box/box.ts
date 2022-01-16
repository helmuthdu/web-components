import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

export const data: DataSet = {
  append: undefined
};

const getClassName = (data: DataSet) =>
  classMap('block text-content bg-canvas border border-contrast-200 rounded-lg p-5', data.append);

define<DataSet>('ui-box', {
  data,
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassName(dataset);
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('div', { id: 'root', className: getClassName(dataset) }, dom('slot'))
  ]
});
