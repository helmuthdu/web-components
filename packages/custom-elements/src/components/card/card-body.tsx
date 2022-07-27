/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string };
};

const getClassName = ({ dataset }: Props) => classMap('flex flex-col gap-2 text-base text-content p-4', dataset.append);

define<Props>('ui-card-body', {
  props: {
    dataset: {
      append: undefined
    }
  },
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <section id="root" className={getClassName({ dataset })}>
        <slot />
      </section>
    </>
  )
});
