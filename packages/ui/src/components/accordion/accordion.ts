import { classMap, define } from '../../utils/custom-element.util';
import style from './accordion.css?raw';

export type Props = {
  dataset: {
    variant?: UIVariant;
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('accordion', {
    [`is-${dataset.variant}`]: dataset.variant,
  });

const updateChildren = (children: HTMLCollection, { dataset }: Props) => {
  for (const el of children) {
    el.setAttribute('data-variant', dataset.variant!);
  }
};

define('ui-accordion', {
  observedAttributes: ['data-variant'],
  onAttributeChanged(name, _prev, _curr, el) {
    switch (name) {
      case 'data-variant':
        el.rootElement.className = getClassName(el);
        updateChildren(el.children, el);
        break;
    }
  },
  onConnected(el) {
    updateChildren(el.children, el);
  },
  styles: [style],
  template: (el) => /* html */ `
    <div class="${getClassName(el)}">
      <slot></slot>
    </div>
  `,
});
