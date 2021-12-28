import { define } from '../../utils/component.util';
import { pickClassNames } from '../../utils/styling.util';
import styles from './button-group.css';

export type Attributes = {
  append?: string;
};

export const attributes: Attributes = {
  append: undefined
};

const getClassNames = (attrs: Attributes) => {
  return pickClassNames(attrs.append, 'inline-flex rounded-md shadow-sm');
};

define<Attributes>('tw-button-group', {
  attributes,
  styles: [styles],
  template: (attrs, { children }) => {
    for (let idx = 0; idx < children.length; idx++) {
      switch (idx) {
        case 0:
          children[idx]?.setAttribute('group', 'first');
          break;
        case children.length - 1:
          children[idx]?.setAttribute('group', 'last');
          break;
        default:
          children[idx]?.setAttribute('group', '');
      }
    }
    return /*html*/ `
      <link rel="stylesheet" href="/tailwind.css" />
      <div ref="button-group" class="${getClassNames(attrs)}">
        <slot></slot>
      </div>
    `;
  }
});
