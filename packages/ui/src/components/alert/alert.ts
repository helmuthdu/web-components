import '../../elements/close-button/close-button';
import { classMap, define } from '../../utils/custom-element.util';
import style from './alert.css?raw';

export type Props = {
  dataset: { color?: Exclude<UIColor, 'primary'> };
};

const getClassName = ({ dataset }: Props) =>
  classMap('alert', {
    [`is-${dataset.color}`]: dataset.color,
  });

define('ui-alert', {
  onConnected(el) {
    el.event('close-button', 'click', () => {
      el.fire('close');
      el.remove();
    });
  },
  styles: [style],
  template: (el) => /* html */ `
    <div class="${getClassName(el)}">
      <span>
        <slot></slot>
      </span>
      <ui-close-button id="close-button"></ui-close-button>
    </div>
  `,
});
