/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-card-footer', {
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./card-foot.css')],
  template: ({ dataset }) => (
    <>
      <footer id="root" className="card-footer">
        <slot />
      </footer>
    </>
  )
});
