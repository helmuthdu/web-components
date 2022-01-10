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
  onAttributeChanged(name, prev, curr, { widget }) {
    switch (name.replace('data-', '')) {
      case 'append': {
        if (prev) widget.classList.remove(...prev.split(' '));
        if (curr) widget.classList.add(...curr.split(' '));
        break;
      }
    }
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
    <div id="widget" class="${getClassNames(dataset)}">
      <slot></slot>
    </div>
  `
});
