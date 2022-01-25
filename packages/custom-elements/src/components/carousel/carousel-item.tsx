/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    append?: string;
    textPosition?: 'top' | 'center' | 'bottom';
    textAlign?: 'left' | 'center' | 'right';
    src: string;
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'flex flex-col py-8 px-12 absolute inset-0',
    {
      'justify-start': dataset.textPosition === 'top',
      'justify-center': dataset.textPosition === 'center',
      'justify-end': dataset.textPosition === 'bottom'
    },
    {
      'text-left': dataset.textAlign === 'left',
      'text-center': dataset.textAlign === 'center',
      'text-right': dataset.textAlign === 'right'
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
    classList.add('absolute', 'first:relative', 'w-full', 'transition-opacity', 'duration-1000', 'ease-in');
  },
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
