import { classMap, define } from '../../utils/custom-element.util';

export type Props = {
  dataset: {
    variant?: UIVariant;
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('accordion', {
    [`is-${dataset.variant}`]: dataset.variant
  });

const updateChildren = (children: HTMLCollection, { dataset }: Props) => {
  for (const el of children) {
    el.setAttribute('data-variant', dataset.variant as string);
  }
};

define<Props>('ui-accordion', {
  props: {
    dataset: {
      variant: 'primary'
    }
  },
  onAttributeChanged(name, _prev, _curr, el) {
    switch (name) {
      case 'data-variant':
        el.rootElement.className = getClassName(el);
        updateChildren(el.children, el);
        break;
    }
  },
  onConnected: el => {
    updateChildren(el.children, el);
  },
  template: el => /*html*/ `
    <style>
      .accordion {
        display: block;
        padding-block: var(--size-2);
        padding-inline: var(--size-1);
        border-radius: var(--rounded-lg);
      }

      .is-primary {
        background-color: var(--color-canvas);
        border: var(--border) solid var(--color-contrast-200);
      }

      ::slotted([data-variant='primary']:not(:last-child)),
      ::slotted([data-variant='tertiary']:not(:last-child)) {
        display: block;
        border-block-end: var(--border) solid var(--color-contrast-200);
      }

      .is-secondary {
        background-color: transparent;
        gap: var(--size-3);
        flex-direction: column;
        display: flex;
      }

      ::slotted([data-variant='secondary']) {
        display: block;
        margin-block-end: var(--size-2);
        background-color: var(--color-canvas);
        border: var(--border) solid var(--color-contrast-200);
        border-radius: var(--rounded-lg);
      }

      .is-tertiary {
        background-color: transparent;
      }
    </style>
    <div id="root" class="${getClassName(el)}">
      <slot></slot>
    </div>
  `
});
