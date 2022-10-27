/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { horizontal?: boolean };
};

const getClassName = ({ dataset }: Props) =>
  classMap('card', {
    'is-horizontal': dataset.horizontal
  });

define<Props>('ui-card', {
  props: {
    dataset: {
      horizontal: undefined
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./card.css')],
  template: ({ dataset }) => (
    <>
      <div id="host" className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
