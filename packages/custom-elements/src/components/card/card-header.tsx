/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('align-middle text-content text-xl font-medium', dataset.append);

define<Props>('ui-card-header', {
  props: {
    dataset: {
      append: undefined
    }
  },
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <header id="root" className={getClassName({ dataset })}>
        <slot />
      </header>
    </>
  )
});
