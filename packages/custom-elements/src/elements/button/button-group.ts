import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

export const data: DataSet = {
  append: undefined
};

const getClassNames = (data: DataSet) => classMap('inline-flex rounded-md shadow-sm', data.append);

define<DataSet>('ce-button-group', {
  data: data,
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassNames(dataset);
  },
  onConnected({ dataset, children }) {
    for (let idx = 0; idx < (children ?? []).length; idx++) {
      children[idx].setAttribute('data-group', idx === 0 ? 'first' : idx === children.length - 1 ? 'last' : '');
    }
  },
  template: ({ dataset }) => /*html*/ `
    <link rel="stylesheet" href="/tailwind.css" />
    <div id="root" class="${getClassNames(dataset)}">
      <slot></slot>
    </div>
  `
});
