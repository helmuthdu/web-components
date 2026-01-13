import { define } from '../../utils/custom-element.util';
import style from './avatar-group.css?raw';

define('ui-avatar-group', {
  observedAttributes: ['label'],
  styles: [style],
  template: (el: any) => /* html */ `
    <div class="avatar-group" role="group" aria-label="${el.label || 'Avatar group'}">
      <slot></slot>
    </div>
  `,
});
