/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import '../../elements/close-button/close-button';
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { color?: 'error' | 'success' | 'info' | 'contrast' | undefined };
};

const getClassName = ({ dataset }: Props) =>
  classMap('alert', {
    [`is-${dataset.color}`]: dataset.color
  });

define<Props>('ui-alert', {
  props: {
    dataset: {
      color: undefined
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, ref }) {
    ref('host').className = getClassName({ dataset });
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./alert.css')],
  template: ({ dataset, fire, remove }) => (
    <>
      <div id="host" className={getClassName({ dataset })}>
        <span>
          <slot />
        </span>
        <ui-close-button
          onClick={() => {
            fire('close');
            remove();
          }}
        />
      </div>
    </>
  )
});
