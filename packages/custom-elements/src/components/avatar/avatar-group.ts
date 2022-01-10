import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

const getClassNames = (data: DataSet) => classMap('inline-flex items-center flex-wrap', data.append);

define<DataSet>('ce-avatar-group', {
  data: {
    append: undefined
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
    <div id="widget" class="${getClassNames(dataset)}">
      <slot></slot>
    </div>
  `
});
