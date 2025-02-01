import { define } from '../../utils/custom-element.util';
import style from './card-body.css?raw';

define('ui-card-body', {
  styles: [style],
  template: () => /* html */ `
    <section class="card-body">
      <slot></slot>
    </section>
  `,
});
