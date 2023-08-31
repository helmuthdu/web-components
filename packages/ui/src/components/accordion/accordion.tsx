/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    variant?: 'primary' | 'secondary' | 'tertiary';
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('accordion', {
    [`is-${dataset.variant}`]: dataset.variant
  });

const updateChildren = (children: HTMLCollection, { dataset }: Props) => {
  [...children].forEach(el => {
    el.setAttribute('data-variant', dataset.variant as string);
  });
};

define<Props>('ui-accordion', {
  props: {
    dataset: {
      variant: 'primary'
    }
  },
  onAttributeChanged(name, _prev, _curr, { children, dataset, ref }) {
    switch (name) {
      case 'data-variant':
        ref('root').className = getClassName({ dataset });
        updateChildren(children, { dataset });
        break;
    }
  },
  onConnected: ({ dataset, children }) => {
    updateChildren(children, { dataset });
  },
  styles: [import('../../styles/styles.css'), import('./accordion.css')],
  template: ({ dataset }) => (
    <>
      <div id="root" className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
