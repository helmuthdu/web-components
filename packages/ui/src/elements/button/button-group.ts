import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    append?: string;
  };
};

const getClassName = ({ dataset }: Props) => classMap('button-group', dataset.append);

define<Props>('ui-button-group', {
  props: {
    dataset: {
      append: undefined
    }
  },
  onAttributeChanged(name, prev, curr, el) {
    el.rootElement.className = getClassName(el);
  },
  onConnected(el) {
    for (let idx = 0; idx < (el.children ?? []).length; idx++) {
      el.children[idx].setAttribute('data-group', idx === 0 ? 'first' : idx === el.children.length - 1 ? 'last' : '');
    }
  },
  template: el => /*html*/ `
    <style>
      .button-group {
        display: inline-flex;
        border-radius: var(--rounded-md);
        box-shadow: var(--shadow-sm);
      }
    </style>
    <div id="root" class="${getClassName(el)}">
      <slot></slot>
    </div>
  `
});
