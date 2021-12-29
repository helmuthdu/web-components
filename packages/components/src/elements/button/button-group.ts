import { classMap, define } from '../../lib/custom-elements';
import styles from './button-group.css';

export type Props = {
  append?: string;
};

export const props: Props = {
  append: undefined
};

const getClassNames = (attrs: Props) => {
  return classMap(attrs.append, 'inline-flex rounded-md shadow-sm');
};

define<Props>('tw-button-group', {
  props,
  styles: [styles],
  template: (props, { children }) => {
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
      <div ref="button-group" class="${getClassNames(props)}">
        <slot></slot>
      </div>
    `;
  }
});
