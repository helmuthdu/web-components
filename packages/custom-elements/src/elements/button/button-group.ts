import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

export const data: DataSet = {
  append: undefined
};

const getClassName = (data: DataSet) => classMap('inline-flex rounded-md shadow-sm', data.append);

define<DataSet>('ui-button-group', {
  data: data,
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassName(dataset);
  },
  onConnected({ children }) {
    for (let idx = 0; idx < (children ?? []).length; idx++) {
      children[idx].setAttribute('data-group', idx === 0 ? 'first' : idx === children.length - 1 ? 'last' : '');
    }
  },
  template: ({ dataset }) => [
    dom(
      'link',
      { rel: 'stylesheet', href: '/tailwind.css' },
      dom('div', { id: 'root', className: getClassName(dataset) }, dom('slot'))
    )
  ]
});
