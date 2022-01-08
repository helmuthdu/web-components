import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

export const data: DataSet = {
  append: undefined
};

const getClassNames = (attrs: DataSet) => {
  return classMap(attrs.append, 'inline-flex rounded-md shadow-sm');
};

define<DataSet>('ce-button-group', {
  data: data,
  template: ({ dataset, children }) => {
    for (let idx = 0; idx < (children ?? []).length; idx++) {
      switch (idx) {
        case 0:
          children[idx]?.setAttribute('data-group', 'first');
          break;
        case children.length - 1:
          children[idx]?.setAttribute('data-group', 'last');
          break;
        default:
          children[idx]?.setAttribute('data-group', '');
      }
    }
    return /*html*/ `
      <link rel="stylesheet" href="/tailwind.css" />
      <div id="widget" class="${getClassNames(dataset)}">
        <slot></slot>
      </div>
    `;
  }
});
