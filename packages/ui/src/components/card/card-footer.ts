import { define } from '../../utils/custom-element.util';
import style from './card-footer.css?raw';

define('ui-card-footer', {
  styles: [style],
  template: () => /* html */ `
    <footer class="card-footer">
      <slot></slot>
    </footer>
  `,
});
