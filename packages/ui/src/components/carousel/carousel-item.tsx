/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    textPosition?: 'top' | 'middle' | 'bottom';
    textAlign?: 'left' | 'center' | 'right';
    src: string;
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('carousel-text', {
    [`is-${dataset.textPosition}`]: dataset.textPosition,
    [`is-${dataset.textAlign}`]: dataset.textAlign
  });

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
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./carousel-item.css')],
  template: ({ dataset }) => (
    <>
      <img className="carousel-content" src={dataset.src} alt="" />
      <div className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
