import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

export const data: DataSet = {
  append: undefined
};

const getClassNames = (data: DataSet) =>
  classMap('block text-content bg-canvas border border-contrast-300 rounded-lg p-5', data.append);

define<DataSet>('ce-box', {
  data,
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
