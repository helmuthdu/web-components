/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import styles from './avatar.css';

export type Props = {
  dataset: {
    append?: string;
    variant?: 'circle' | 'rounded';
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'overflow-hidden border border-white/30',
    {
      'rounded-full': dataset.variant === 'circle',
      'rounded-lg': dataset.variant === 'rounded'
    },
    dataset.append
  );

define<Props>('ui-avatar', {
  props: {
    dataset: {
      append: undefined,
      variant: undefined
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, spot }) {
    spot('root').className = getClassName({ dataset });
  },
  styles: [styles],
  template: ({ dataset, fire, remove }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <div id="root" className={getClassName({ dataset })}>
        <span className="text-sm">
          <slot />
        </span>
      </div>
    </>
  )
});
