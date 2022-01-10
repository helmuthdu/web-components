import { define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
  header: string;
};

define<DataSet>('ce-accordion', {
  data: {
    append: undefined,
    header: ''
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
      details[open] summary ~ * {
        animation: open .5s ease-in-out;
      }
      details svg {
        transition: transform .3s ease-in-out;
      }
      details[open] svg {
        transform: rotate(90deg);
      }
      details summary::-webkit-details-marker {
        display: none;
      }
      @keyframes open {
        0% { opacity: 0; display: none; }
        1% { opacity: 0; display: block; }
        100% { opacity: 1; display: block; }
      }
    </style>
    <details id="widget" class="block text-content py-2 px-4">
      <summary class="block py-1 cursor-pointer">
        <svg class="w-4 h-4 float-left mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        ${dataset.header}
      </summary>
      <div><slot></slot></div>
    </details>
  `
});
