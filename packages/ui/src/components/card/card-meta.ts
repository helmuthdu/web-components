import { define } from '../../utils/custom-element.util';
import style from './card-meta.css?raw';

define('ui-card-meta', {
  styles: [style],
  template: () => /* html */ `
    <span class="card-meta">
      <slot></slot>
    </span>
  `,
});
