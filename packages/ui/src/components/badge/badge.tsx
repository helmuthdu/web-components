/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import type { Sizes } from '../../types';

export type Props = {
  dataset: {
    color?: 'error' | 'success' | 'info' | 'contrast' | undefined;
    pill?: boolean;
    size?: Sizes;
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('badge', {
    'is-pill': dataset.pill,
    [`is-${dataset.size}`]: dataset.size,
    [`is-${dataset.color}`]: dataset.color
  });

define<Props>('ui-badge', {
  props: {
    dataset: {
      pill: undefined,
      size: 'md',
      color: undefined
    }
  },
  onAttributeChanged: (name, prev, curr, { dataset, ref }) => {
    switch (name) {
      case 'data-color':
      case 'data-pill':
      case 'data-size':
        ref('host').className = getClassName({ dataset });
        break;
    }
  },
  styles: [import('../../styles/styles.css'), import('./badge.css')],
  template: ({ dataset }) => (
    <>
      <span id="host" className={getClassName({ dataset })}>
        <slot />
      </span>
    </>
  )
});
