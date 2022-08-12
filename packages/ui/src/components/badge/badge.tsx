/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import type { Sizes } from '../../types';

export type Props = {
  dataset: {
    append?: string;
    color?: 'error' | 'success' | 'info' | 'contrast' | undefined;
    pill?: boolean;
    size?: Sizes;
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'badge',
    {
      'badge-pill': dataset.pill,
      [`badge-${dataset.size}`]: dataset.size,
      [`badge-${dataset.color}`]: dataset.color
    },
    dataset.append
  );

define<Props>('ui-badge', {
  props: {
    dataset: {
      append: undefined,
      pill: undefined,
      size: 'md',
      color: undefined
    }
  },
  onAttributeChanged: (name, prev, curr, { dataset, spot }) => {
    switch (name) {
      case 'data-append':
      case 'data-color':
      case 'data-pill':
      case 'data-size':
        spot('root').className = getClassName({ dataset });
        break;
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/variables.css'), import('./badge.css')],
  template: ({ dataset }) => (
    <>
      <span id="root" className={getClassName({ dataset })}>
        <slot />
      </span>
    </>
  )
});
