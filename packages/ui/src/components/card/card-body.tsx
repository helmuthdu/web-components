/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-card-body', {
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./card-body.css')],
  template: ({ dataset }) => (
    <>
      <section id="root" className="card-body">
        <slot />
      </section>
    </>
  )
});
