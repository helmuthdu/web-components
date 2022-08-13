/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('card-meta', dataset.append);

define<Props>('ui-card-meta', {
  props: {
    dataset: {
      append: undefined
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./card-meta.css')],
  template: ({ dataset }) => (
    <>
      <span id="root" className={getClassName({ dataset })}>
        <slot />
      </span>
    </>
  )
});
