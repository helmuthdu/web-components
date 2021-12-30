import { classMap, define } from '../../lib/custom-element';
import styles from './box.css';

export type Props = {
  append?: string;
};

export const props: Props = {
  append: undefined
};

define('tw-box', {
  props,
  styles: [styles],
  template: (props: Props) => /*html*/ `
      <link rel="stylesheet" href="/tailwind.css" />
      <div class="${classMap(props.append, 'box')}">
        <slot></slot>
      </div>
    `
});
