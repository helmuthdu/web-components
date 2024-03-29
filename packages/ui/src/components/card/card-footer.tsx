/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-card-footer', {
  styles: [import('../../styles/styles.css'), import('./card-foot.css')],
  template: () => (
    <>
      <footer id="host" className="card-footer">
        <slot />
      </footer>
    </>
  )
});
