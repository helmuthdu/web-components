import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

export const data: DataSet = {
  append: undefined
};

define<DataSet>('tw-box', {
  data,
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
    <div id="widget" class="${classMap(
      'block text-content bg-canvas border border-contrast-200 shadow-md rounded-lg p-5',
      dataset.append
    )}">
      <slot></slot>
    </div>
  `
});
