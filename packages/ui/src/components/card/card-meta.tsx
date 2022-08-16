/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-card-meta', {
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./card-meta.css')],
  template: ({ dataset }) => (
    <>
      <span id="root" className="card-meta">
        <slot />
      </span>
    </>
  )
});
