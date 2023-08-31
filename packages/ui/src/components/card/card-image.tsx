/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = {
  dataset: { src?: string };
};

define<Props>('ui-card-image', {
  props: {
    dataset: {
      src: undefined
    }
  },
  styles: [import('../../styles/styles.css'), import('./card-image.css')],
  template: ({ dataset }) => (
    <>
      <img id="host" className="card-image" src={dataset.src} alt="" />
    </>
  )
});
