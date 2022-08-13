/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import '../../common/close-button/close-button';

export type Props = {
  dataset: { append?: string; color?: 'error' | 'success' | 'info' | 'contrast' | undefined };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'alert',
    {
      [`alert-${dataset.color}`]: dataset.color
    },
    dataset.append
  );

define<Props>('ui-alert', {
  props: {
    dataset: {
      append: undefined,
      color: undefined
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, spot }) {
    spot('root').className = getClassName({ dataset });
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./alert.css')],
  template: ({ dataset, fire, remove }) => (
    <>
      <div id="root" className={getClassName({ dataset })}>
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
