/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('card-header', dataset.append);

define<Props>('ui-card-header', {
  props: {
    dataset: {
      append: undefined
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/variables.css'), import('./card-header.css')],
  template: ({ dataset }) => (
    <>
      <header id="root" className={getClassName({ dataset })}>
        <slot />
      </header>
    </>
  )
});
