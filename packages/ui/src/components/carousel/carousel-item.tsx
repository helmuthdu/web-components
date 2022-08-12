/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    append?: string;
    textPosition?: 'top' | 'middle' | 'bottom';
    textAlign?: 'left' | 'center' | 'right';
    src: string;
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'carousel-item',
    {
      [`carousel-item-text-position-${dataset.textPosition}`]: dataset.textPosition,
      [`carousel-item-text-align-${dataset.textAlign}`]: dataset.textAlign
    },
    dataset.append
  );

define<Props>('ui-carousel-item', {
  props: {
    dataset: {
      textAlign: 'center',
      textPosition: 'bottom',
      src: ''
    }
  },
  onConnected: ({ classList }) => {
    classList.add('carousel-image');
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/variables.css'), import('./carousel-item.css')],
  template: ({ dataset }) => (
    <>
      <img id="root" className="carousel-item-wrapper" src={dataset.src} alt="" />
      <div className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
