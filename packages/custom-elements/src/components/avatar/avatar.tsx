/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    append?: string;
    style?: 'circle' | 'rounded';
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'overflow-hidden border border-white/30',
    {
      'rounded-full': dataset.style === 'circle',
      'rounded-lg': dataset.style === 'rounded'
    },
    dataset.append
  );

define<Props>('ui-avatar', {
  props: {
    dataset: {
      append: undefined,
      style: 'circle'
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassName({ dataset });
  },
  template: ({ dataset, fire, remove }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <style
        dangerouslySetInnerHTML={{
          __html: `::slotted(:first-child) { display: flex; justify-content: center; align-items: center; }`
        }}
      />
      <div id="root" className={getClassName({ dataset })}>
        <span className="text-sm">
          <slot />
        </span>
      </div>
    </>
  )
});
