import { dom, rawHtml } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string; header: string };
};

const getClassName = ({ dataset }: Props) => classMap('block text-content py-2 px-4', dataset.append);

define<Props>('ui-accordion', {
  props: {
    dataset: {
      append: undefined,
      header: ''
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, update, root, shadowRoot }) {
    switch (name) {
      case 'data-append':
        root.className = getClassName({ dataset });
        break;
      case 'data-header': {
        const el = shadowRoot?.getElementById('header');
        if (el) el.innerText = curr;
        break;
      }
    }
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom(
      'style',
      {},
      `details svg { transition: transform 0.3s ease-in-out; } details[open] svg { transform: rotate(90deg); } details summary::-webkit-details-marker { display: none; }`
    ),
    dom(
      'details',
      { id: 'root', className: getClassName({ dataset }) },
      dom(
        'summary',
        { className: 'flex items-center gap-2 py-1 cursor-pointer' },
        rawHtml(
          `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`
        ),
        dom('span', { id: 'header' }, dataset.header)
      ),
      dom('div', {}, dom('slot'))
    )
  ]
});
