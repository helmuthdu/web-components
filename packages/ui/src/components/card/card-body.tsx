/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import styles from './card-body.css';

export type Props = {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('card-body', dataset.append);

define<Props>('ui-card-body', {
  props: {
    dataset: {
      append: undefined
    }
  },
  styles: [styles],
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <section id="root" className={getClassName({ dataset })}>
        <slot />
      </section>
    </>
  )
});
