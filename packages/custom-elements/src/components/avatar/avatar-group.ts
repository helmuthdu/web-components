import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

const getClassNames = (data: DataSet) => classMap('inline-flex items-center flex-wrap', data.append);

define<DataSet>('ce-avatar-group', {
  data: {
    append: undefined
  },
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassNames(dataset);
  },
  template: ({ dataset }) => /*html*/ `
    <link rel="stylesheet" href="/tailwind.css" />
    <div id="root" class="${getClassNames(dataset)}">
      <slot></slot>
    </div>
  `
});
