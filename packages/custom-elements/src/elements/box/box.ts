import { classMap, define } from '../../lib/custom-element';
import styles from './box.css';

export type DataSet = {
  append?: string;
};

export const data: DataSet = {
  append: undefined
};

define<DataSet>('tw-box', {
  data,
  styles: [styles],
  template: ({dataset}) => /*html*/ `
    <link rel="stylesheet" href="/tailwind.css" />
    <div class="${classMap(dataset.append, 'box')}">
      <slot></slot>
    </div>
  `
});
