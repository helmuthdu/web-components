/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import styles from './card.css';

export type Props = {
  dataset: { append?: string; horizontal?: boolean };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'card',
    {
      'card-horizontal': dataset.horizontal
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
  styles: [styles],
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <div id="root" className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
