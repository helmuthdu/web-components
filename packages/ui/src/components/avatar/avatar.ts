import { classMap, define } from '../../utils/custom-element.util';
import style from './avatar.css?raw';

define('ui-avatar', {
  observedAttributes: ['variant'],
  styles: [style],
  template: (el: any) => /* html */ `
    <div class="${classMap('avatar', {
      [`is-${el.variant}`]: el.variant,
    })}">
      <slot></slot>
    </div>
  `,
});
