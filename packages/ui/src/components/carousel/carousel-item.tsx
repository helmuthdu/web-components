/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import styles from './carousel-item.css';

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
  styles: [styles],
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <img id="root" className="relative block w-full" src={dataset.src} alt="" />
      <div className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
