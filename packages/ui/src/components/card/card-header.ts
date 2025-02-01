import { define } from '../../utils/custom-element.util';
import style from './card-header.css?raw';

define('ui-card-header', {
  styles: [style],
  template: (el) => /* html */ `
  <header class="card-header">
    <slot></slot>
  </header>
  `,
});
