import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
  style?: 'circle' | 'rounded';
};

const getClassNames = (data: DataSet) =>
  classMap(
    'overflow-hidden border border-white/30',
    {
      'rounded-full': data.style === 'circle',
      'rounded-lg': data.style === 'rounded'
    },
    data.append
  );

define<DataSet>('ce-avatar', {
  data: {
    append: undefined,
    style: 'circle'
  },
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassNames(dataset);
  },
  template: ({ dataset }) => /*html*/ `
    <link rel="stylesheet" href="/tailwind.css" />
    <style>
      ::slotted(:first-child) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <div id="root" class="${getClassNames(dataset)}">
      <slot></slot>
    </div>
  `
});
