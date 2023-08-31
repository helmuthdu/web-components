/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    variant?: 'circle' | 'rounded';
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('avatar', {
    [`is-${dataset.variant}`]: dataset.variant
  });

define<Props>('ui-avatar', {
  props: {
    dataset: {
      variant: undefined
    }
  },
  onAttributeChanged(_name, _prev, _curr, { dataset, ref }) {
    ref('host').className = getClassName({ dataset });
  },
  styles: [import('../../styles/styles.css'), import('./avatar.css')],
  template: ({ dataset }) => (
    <>
      <div id="host" className={getClassName({ dataset })}>
        <span className="text-sm">
          <slot />
        </span>
      </div>
    </>
  )
});
