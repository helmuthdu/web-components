import { markup } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
};

const getClassName = (data: DataSet) =>
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

define<DataSet>('ui-accordion-group', {
  data: {
    append: undefined,
    variant: 'primary'
  },
  onAttributeChanged(name, prev, curr, { children, dataset, root }) {
    switch (name) {
      case 'append':
        root.className = getClassName(dataset);
        break;
      case 'variant':
        root.className = getClassName(dataset);
        updateChildren(children, dataset);
        break;
    }
  },
  onConnected: ({ dataset, children }) => {
    updateChildren(children, dataset);
  },
  template: ({ dataset }) => {
    const { link, div, slot } = markup;
    return [
      link({ rel: 'stylesheet', href: '/tailwind.css' }),
      div({ id: 'root', className: getClassName(dataset) }, slot())
    ];
  }
});
