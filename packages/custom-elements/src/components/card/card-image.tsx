/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string; src?: string };
};

const getClassName = ({ dataset }: Props) => classMap('w-auto h-full object-cover', dataset.append);

define<Props>('ui-card-image', {
  props: {
    dataset: {
      append: undefined,
      src: undefined
    }
  },
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <img id="root" className={getClassName({ dataset })} src={dataset.src} alt="" />
    </>
  )
});
