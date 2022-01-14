import { markup, raw } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
  header: string;
};

const getClassName = (data: DataSet) => classMap('block text-content py-2 px-4', data.append);

define<DataSet>('ui-accordion', {
  data: {
    append: undefined,
    header: ''
  },
  onAttributeChanged(name, prev, curr, { dataset, update, root, shadowRoot }) {
    switch (name) {
      case 'append':
        root.className = getClassName(dataset);
        break;
      case 'header':
        const el = shadowRoot?.getElementById('header');
        if (el) el.innerText = curr;
        break;
    }
  },
  template: ({ dataset }) => {
    const { link, style, details, summary, div, span, slot } = markup;
    return [
      link({ rel: 'stylesheet', href: '/tailwind.css' }),
      style(`
        details[open] summary ~ * {
          animation: open 0.5s ease-in-out;
        }
        details svg {
          transition: transform 0.3s ease-in-out;
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
      `),
      details(
        { id: 'root', className: getClassName(dataset) },
        summary(
          {
            className: 'block py-1 cursor-pointer'
          },
          raw(`
            <svg class="w-4 h-4 float-left mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          `),
          span({ id: 'header' }, dataset.header)
        ),
        div({}, slot())
      )
    ];
  }
});
