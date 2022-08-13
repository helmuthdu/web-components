/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string; horizontal?: boolean };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'card',
    {
      'is-horizontal': dataset.horizontal
    },
    dataset.append
  );

define<Props>('ui-card', {
  props: {
    dataset: {
      append: undefined,
      horizontal: undefined
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./card.css')],
  template: ({ dataset }) => (
    <>
      <div id="root" className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
