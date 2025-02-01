import { define } from '../../utils/custom-element.util';
import style from './box.css?raw';

define('ui-box', {
  styles: [style],
  template: () => /*html*/ `
    <div class="box">
      <slot></slot>
    </div>
  `,
});
