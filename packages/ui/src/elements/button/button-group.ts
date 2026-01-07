import { define } from '../../utils/custom-element.util';
import style from './button-group.css?raw';

define('ui-button-group', {
  onConnected(el) {
    for (let idx = 0; idx < (el.children ?? []).length; idx++) {
      el.children[idx].setAttribute('group', idx === 0 ? 'first' : idx === el.children.length - 1 ? 'last' : '');
    }
  },
  styles: [style],
  template: () => /*html*/ `
    <div class="button-group">
      <slot></slot>
    </div>
  `,
});
