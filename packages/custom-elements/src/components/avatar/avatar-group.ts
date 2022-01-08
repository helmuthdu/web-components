import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
  variant?: 'transparent' | 'solid' | 'filled' | undefined;
};

const getClassNames = (data: DataSet) => {
  return classMap('block rounded-full w-24 h-24 overflow-hidden');
};

define<DataSet>('ce-avatar-group', {
  data: {
    append: undefined,
    variant: 'solid'
  },
  onAttributeChanged(name, prev, curr, { widget }) {
    switch (name) {
      case 'append': {
        if (prev) widget.classList.remove(...prev.split(' '));
        if (curr) widget.classList.add(...curr.split(' '));
        break;
      }
    }
  },
  template: ({ dataset }) => /*html*/ `
    <link rel="stylesheet" href="/tailwind.css" />
    <div id="widget" class="${getClassNames(dataset)}">
      <slot></slot>
    </div>
  `
});
