/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { append?: string; horizontal?: boolean };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'flex justify-center rounded-lg shadow-lg bg-white dark:bg-canvas border border-contrast-200 max-w-sm overflow-hidden',
    dataset.horizontal ? 'flex-row' : 'flex-col',
    dataset.append
  );

define<Props>('ui-card', {
  props: {
    dataset: {
      append: undefined,
      horizontal: undefined
    }
  },
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <div id="root" className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
