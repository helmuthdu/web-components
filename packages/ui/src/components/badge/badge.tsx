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
  onAttributeChanged: (name, prev, curr, { dataset, spot }) => {
    switch (name) {
      case 'data-color':
      case 'data-pill':
      case 'data-size':
        spot('root').className = getClassName({ dataset });
        break;
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./badge.css')],
  template: ({ dataset }) => (
    <>
      <span id="root" className={getClassName({ dataset })}>
        <slot />
      </span>
    </>
  )
});
