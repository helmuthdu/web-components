import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

export const data: DataSet = {
  append: undefined
};

define<DataSet>('tw-box', {
  data,
  template: ({ dataset }) => /*html*/ `
    <link rel="stylesheet" href="/tailwind.css" />
    <div class="${classMap(dataset.append, 'box')}">
      <slot></slot>
    </div>
  `
});
