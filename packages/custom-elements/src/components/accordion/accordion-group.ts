import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
};

const getClassNames = (data: DataSet) =>
  classMap('block rounded-lg px-2 py-1', {
    'bg-canvas border border-contrast-300': data.variant === 'secondary',
    'bg-transparent': data.variant === 'primary' || data.variant === 'tertiary'
  });

define<DataSet>('ce-accordion-group', {
  data: {
    append: undefined,
    variant: 'secondary'
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
  onConnected: ({ dataset, children }) => {
    [...children].forEach((el, idx) => {
      if ((dataset.variant === 'secondary' || dataset.variant === 'tertiary') && idx < children.length - 1) {
        el.classList.add('block', 'border-b', 'border-contrast-300');
      } else if (dataset.variant === 'primary') {
        el.classList.add('block', 'mb-2', 'rounded-lg', 'bg-canvas', 'border', 'border-contrast-300');
      }
    });
  },
  template: ({ dataset }) => /*html*/ `
    <link rel="stylesheet" href="/tailwind.css" />
    <div id="widget" class="${getClassNames(dataset)}">
      <slot></slot>
    </div>
  `
});
