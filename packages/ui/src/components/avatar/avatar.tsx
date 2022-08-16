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
  onAttributeChanged(name, prev, curr, { dataset, spot }) {
    spot('root').className = getClassName({ dataset });
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./avatar.css')],
  template: ({ dataset, fire, remove }) => (
    <>
      <div id="root" className={getClassName({ dataset })}>
        <span className="text-sm">
          <slot />
        </span>
      </div>
    </>
  )
});
