import '../../elements/close-button/close-button';
import { classMap, define } from '../../utils/custom-element.util';
import style from './alert.css?raw';

type AlertProps = {
  color: Exclude<UIColor, 'primary'>;
};

define<HTMLElement, AlertProps>('ui-alert', {
  observedAttributes: ['color'],
  onConnected(el) {
    el.event('close-button', 'click', () => {
      el.fire('close');
      el.remove();
    });
  },
  styles: [style],
  template: (el) => /* html */ `
    <div class="${classMap('alert', {
      [`is-${el.color}`]: el.color,
    })}">
      <span>
        <slot></slot>
      </span>
      <ui-close-button id="close-button"></ui-close-button>
    </div>
  `,
});
