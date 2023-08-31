/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-card-header', {
  styles: [import('../../styles/styles.css'), import('./card-header.css')],
  template: () => (
    <>
      <header id="host" className="card-header">
        <slot />
      </header>
    </>
  )
});
