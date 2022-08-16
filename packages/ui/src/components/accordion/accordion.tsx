/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = {
  dataset: { header: string };
};

define<Props>('ui-accordion', {
  props: {
    dataset: {
      header: ''
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./accordion.css')],
  template: ({ dataset }) => (
    <>
      <details id="root" className="accordion">
        <summary className="accordion-header">
          <svg fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
          </svg>
          <slot name="header" />
        </summary>
        <div>
          <slot />
        </div>
      </details>
    </>
  )
});
