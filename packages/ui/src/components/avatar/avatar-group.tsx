/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-avatar-group', {
  styles: [import('../../styles/styles.css'), import('./avatar-group.css')],
  template: () => (
    <>
      <div id="host" className="avatar-group">
        <slot />
      </div>
    </>
  )
});
