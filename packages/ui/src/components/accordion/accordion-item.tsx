/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = {
  dataset: { header: string };
};

define<Props>('ui-accordion-item', {
  props: {
    dataset: {
      header: ''
    }
  },
  styles: [import('../../styles/styles.css'), import('./accordion-item.css')],
  template: ({ dataset }) => (
    <>
      <details id="host" className="accordion-item">
        <summary part="header">
          <svg fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
          </svg>
          <slot name="header" />
        </summary>
        <div part="content">
          <slot />
        </div>
      </details>
    </>
  )
});
