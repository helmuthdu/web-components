import { define } from '../../utils/custom-element.util';

define('ui-avatar-group', {
  template: () => /*html*/ `
    <style>
      .avatar-group {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
      }
    </style>
    <div id="avatar-group" class="avatar-group">
      <slot></slot>
    </div>
  `
});
