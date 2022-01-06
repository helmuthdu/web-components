import { classMap, define } from '../../lib/custom-element';
import styles from './button-group.css';

export type DataSet = {
  append?: string;
};

export const data: DataSet = {
  append: undefined
};

const getClassNames = (attrs: DataSet) => {
  return classMap(attrs.append, 'inline-flex rounded-md shadow-sm');
};

define<DataSet>('tw-button-group', {
  data: data,
  styles: [styles],
  template: ({ dataset, children }) => {
    for (let idx = 0; idx < (children ?? []).length; idx++) {
      switch (idx) {
        case 0:
          children[idx]?.setAttribute('group', 'first');
          break;
        case children.length - 1:
          children[idx]?.setAttribute('group', 'last');
          break;
        default:
          children[idx]?.setAttribute('group', '');
      }
    }
    return /*html*/ `
      <link rel="stylesheet" href="/tailwind.css" />
      <div ref="button-group" class="${getClassNames(dataset)}">
        <slot></slot>
      </div>
    `;
  }
});
