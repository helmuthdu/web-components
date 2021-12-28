import { define } from '../../utils/component.util';
import { pickClassNames } from '../../utils/styling.util';
// styles
import tailwind from '../../../tailwind.css';
import styles from './box.css';

export type Attributes = {
  append?: string;
};

export const attributes: Attributes = {
  append: undefined
};

define('tw-box', {
  attributes,
  styles: [tailwind, styles],
  template: (attrs: Attributes) => /*html*/ `
      <div class="${pickClassNames(attrs.append, 'box')}">
        <slot></slot>
      </div>
    `
});
