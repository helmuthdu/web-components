import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
  variant?: 'transparent' | 'solid' | 'filled' | undefined;
};

const getClassNames = (data: DataSet) => {
  return classMap('block rounded-lg px-2 py-1', {
    ['bg-canvas border border-contrast-300']: data.variant === 'solid',
    ['bg-transparent']: data.variant === 'transparent' || data.variant === 'filled'
  });
};

define<DataSet>('tw-accordion', {
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
  onConnected: ({ dataset, children }) => {
    [...children].forEach((el, idx) => {
      if (dataset.variant === 'solid' && idx < children.length - 1) {
        el.classList.add('block', 'border-b', 'border-contrast-300');
      } else if (dataset.variant === 'transparent') {
        el.classList.add('block');
      } else if (dataset.variant === 'filled') {
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
