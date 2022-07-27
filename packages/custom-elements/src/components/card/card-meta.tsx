/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('block text-sm text-content-tertiary', dataset.append);

define<Props>('ui-card-meta', {
  props: {
    dataset: {
      append: undefined
    }
  },
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <span id="root" className={getClassName({ dataset })}>
        <slot />
      </span>
    </>
  )
});
