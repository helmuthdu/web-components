import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
};

const getClassNames = (data: DataSet) =>
  classMap(
    'block rounded-lg px-2 py-1',
    {
      'bg-canvas border border-contrast-300': data.variant === 'primary',
      'bg-transparent': data.variant === 'secondary' || data.variant === 'tertiary'
    },
    data.append
  );

const updateChildren = (children: HTMLCollection, dataset: DataSet) => {
  const primary = ['block', 'border-b', 'border-contrast-300'];
  const secondary = ['block', 'mb-2', 'rounded-lg', 'bg-canvas', 'border', 'border-contrast-300'];
  const tertiary = ['block', 'border-b', 'border-contrast-700'];
  [...children].forEach((el, idx) => {
    el.classList.remove(...primary, ...secondary, ...tertiary);
    if (dataset.variant === 'secondary') {
      el.classList.add(...secondary);
    } else if (idx < children.length - 1) {
      el.classList.add(...(dataset.variant === 'tertiary' ? tertiary : primary));
    }
  });
};

define<DataSet>('ce-accordion-group', {
  data: {
    append: undefined,
    variant: 'primary'
  },
  onAttributeChanged(name, prev, curr, { children, dataset, root }) {
    switch (name) {
      case 'append':
        root.className = getClassNames(dataset);
        break;
      case 'variant':
        root.className = getClassNames(dataset);
        updateChildren(children, dataset);
        break;
    }
  },
  onConnected: ({ dataset, children }) => {
    updateChildren(children, dataset);
  },
  template: ({ dataset }) => /*html*/ `
    <link rel="stylesheet" href="/tailwind.css" />
    <div id="root" class="${getClassNames(dataset)}">
      <slot></slot>
    </div>
  `
});
