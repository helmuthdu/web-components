/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('inline-flex gap-2 w-full', dataset.append);

define<Props>('ui-card-footer', {
  props: {
    dataset: {
      append: undefined
    }
  },
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <footer id="root" className={getClassName({ dataset })}>
        <slot />
      </footer>
    </>
  )
});
