/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('card-body', dataset.append);

define<Props>('ui-card-body', {
  props: {
    dataset: {
      append: undefined
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/variables.css'), import('./card-body.css')],
  template: ({ dataset }) => (
    <>
      <section id="root" className={getClassName({ dataset })}>
        <slot />
      </section>
    </>
  )
});
