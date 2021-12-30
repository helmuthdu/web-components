import { classMap, define } from '../../lib/custom-element';
import styles from './box.css';

export type Props = {
  append?: string;
};

export const props: Props = {
  append: undefined
};

define<Props>('tw-box', {
  props,
  styles: [styles],
  template: host => /*html*/ `
      <link rel="stylesheet" href="/tailwind.css" />
      <div class="${classMap(host.append, 'box')}">
        <slot></slot>
      </div>
    `
});
