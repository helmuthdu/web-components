import { define } from '../../utils/custom-element.util';
import style from './avatar-text.css?raw';

export type Props = {
  dataset: {
    hue?: string;
    lightness?: string;
    saturation?: string;
    size?: string;
  };
};

define('ui-avatar-text', {
  observedAttributes: ['data-hue', 'data-lightness', 'data-saturation', 'data-size'],
  onAttributeChanged(name, _prev, curr, el) {
    switch (name) {
      case 'data-hue':
        el.style.setProperty('--avatar-hue', curr);
        break;
      case 'data-lightness':
        el.style.setProperty('--avatar-lightness', curr);
        break;
      case 'data-saturation':
        el.style.setProperty('--avatar-saturation', curr);
        break;
      case 'data-size':
        el.style.setProperty('--avatar-size', curr);
        break;
    }
  },
  styles: [style],
  template: () => /* html */ `
    <div class="avatar-text">
      <span><slot></slot></span>
    </div>
  `,
});
