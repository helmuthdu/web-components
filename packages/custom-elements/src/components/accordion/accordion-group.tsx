/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    append?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'block rounded-lg px-2 py-1',
    {
      'bg-canvas border border-contrast-200': dataset.variant === 'primary',
      'bg-transparent': dataset.variant === 'secondary' || dataset.variant === 'tertiary'
    },
    dataset.append
  );

const updateChildren = (children: HTMLCollection, { dataset }: Props) => {
  const primary = ['block', 'border-b', 'border-contrast-200'];
  const secondary = ['block', 'mb-2', 'rounded-lg', 'bg-canvas', 'border', 'border-contrast-200'];
  const tertiary = ['block', 'border-b', 'border-contrast-200'];
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
  onAttributeChanged(name, prev, curr, { children, dataset, root }) {
    switch (name) {
      case 'data-append':
        root.className = getClassName({ dataset });
        break;
      case 'data-variant':
        root.className = getClassName({ dataset });
        updateChildren(children, { dataset });
        break;
    }
  },
  onConnected: ({ dataset, children }) => {
    updateChildren(children, { dataset });
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
