/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-card-body', {
  styles: [import('../../styles/styles.css'), import('./card-body.css')],
  template: () => (
    <>
      <section id="host" className="card-body">
        <slot />
      </section>
    </>
  )
});
