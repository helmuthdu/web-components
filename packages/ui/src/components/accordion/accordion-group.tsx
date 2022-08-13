/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import styles from './accordion-group.css';

export type Props = {
  dataset: {
    append?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'accordion-group',
    {
      [`is-${dataset.variant}`]: dataset.variant
    },
    dataset.append
  );

const updateChildren = (children: HTMLCollection, { dataset }: Props) => {
  const primary = ['accordion-group-item', 'is-primary'];
  const secondary = ['accordion-group-item', 'is-secondary'];
  const tertiary = ['accordion-group-item', 'is-tertiary'];
  [...children].forEach((el, idx) => {
    el.classList.remove(...primary, ...secondary, ...tertiary);
    if (dataset.variant === 'secondary') {
      el.classList.add(...secondary);
    } else if (idx < children.length - 1) {
      el.classList.add(...(dataset.variant === 'tertiary' ? tertiary : primary));
    }
  });
};

define<Props>('ui-accordion-group', {
  props: {
    dataset: {
      append: undefined,
      variant: 'primary'
    }
  },
  onAttributeChanged(name, prev, curr, { children, dataset, spot }) {
    switch (name) {
      case 'data-append':
        spot('root').className = getClassName({ dataset });
        break;
      case 'data-variant':
        spot('root').className = getClassName({ dataset });
        updateChildren(children, { dataset });
        break;
    }
  },
  onConnected: ({ dataset, children }) => {
    updateChildren(children, { dataset });
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), styles],
  template: ({ dataset }) => (
    <>
      <div id="root" className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
