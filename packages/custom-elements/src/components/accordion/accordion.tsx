/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string; header: string };
};

const getClassName = ({ dataset }: Props) => classMap('block text-content p-4', dataset.append);

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
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <style
        dangerouslySetInnerHTML={{
          __html: `details svg { transition: transform 0.3s ease-in-out; } details[open] svg { transform: rotate(90deg); } details summary::-webkit-details-marker { display: none; }`
        }}
      />
      <details id="root" className={getClassName({ dataset })}>
        <summary className="flex items-center gap-2 py-1 cursor-pointer">
          <svg
            fill="none"
            className="w-4 h-4"
            stroke="currentColor"
            viewBox="0 0 23 23"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
          </svg>
          {dataset.header}
        </summary>
        <div>
          <slot />
        </div>
      </details>
    </>
  )
});
