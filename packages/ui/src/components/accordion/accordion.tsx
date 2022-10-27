/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    variant?: 'primary' | 'secondary' | 'tertiary';
  };
};

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
        ref('root').setAttribute('class', `accordion is-${dataset.variant}`);
        updateChildren(children, { dataset });
        break;
    }
  },
  onConnected: ({ dataset, children }) => {
    updateChildren(children, { dataset });
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./accordion.css')],
  template: ({ dataset }) => (
    <>
      <div id="root" className={`accordion is-${dataset.variant}`}>
        <slot />
      </div>
    </>
  )
});
