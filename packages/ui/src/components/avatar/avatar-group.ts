import { define } from '../../lib/custom-element';

export type Props = undefined;

define<Props>('ui-avatar-group', {
  template: () => /*html*/ `
    <style>
      .avatar-group {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
      }
    </style>
    <div id="avatar-group" class="avatar-group">
      <slot />
    </div>
  `
});
