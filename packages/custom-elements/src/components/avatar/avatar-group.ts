import { classMap, define, markup } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

const getClassName = (data: DataSet) => classMap('inline-flex items-center flex-wrap', data.append);

define<DataSet>('ui-avatar-group', {
  data: {
    append: undefined
  },
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassName(dataset);
  },
  template: ({ dataset }) => {
    const { link, div, slot } = markup;
    return [
      link({ rel: 'stylesheet', href: '/tailwind.css' }),
      div({ id: 'root', className: getClassName(dataset) }, slot())
    ];
  }
});
