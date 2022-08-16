/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-box', {
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./box.css')],
  template: ({ dataset }) => (
    <>
      <div id="root" className="box">
        <slot />
      </div>
    </>
  )
});
