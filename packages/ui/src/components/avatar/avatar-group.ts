import { define } from '../../utils/custom-element.util';
import style from './avatar-group.css?raw';

define('ui-avatar-group', {
  styles: [style],
  template: () => /* html */ `
    <div class="avatar-group">
      <slot></slot>
    </div>
  `,
});
