/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string; src?: string };
};

const getClassName = ({ dataset }: Props) => classMap('card-image', dataset.append);

define<Props>('ui-card-image', {
  props: {
    dataset: {
      append: undefined,
      src: undefined
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./card-image.css')],
  template: ({ dataset }) => (
    <>
      <img id="root" className={getClassName({ dataset })} src={dataset.src} alt="" />
    </>
  )
});
