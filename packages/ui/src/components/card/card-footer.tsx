/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('card-footer', dataset.append);

define<Props>('ui-card-footer', {
  props: {
    dataset: {
      append: undefined
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/variables.css'), import('./card-foot.css')],
  template: ({ dataset }) => (
    <>
      <footer id="root" className={getClassName({ dataset })}>
        <slot />
      </footer>
    </>
  )
});
