import { define } from '../../utils/custom-element.util';
import style from './avatar-text.css?raw';

export type AvatarTextProps = {
  hue?: string;
  lightness?: string;
  saturation?: string;
  size?: string;
};

define<HTMLElement, AvatarTextProps>('ui-avatar-text', {
  observedAttributes: ['hue', 'lightness', 'saturation', 'size'],
  onAttributeChanged(name, _prev, curr, el) {
    if (curr !== null) {
      el.style.setProperty(`--avatar-${name}`, curr);
    }
  },
  styles: [style],
  template: () => /* html */ `
    <div class="avatar-text">
      <span><slot></slot></span>
    </div>
  `,
});
