import { define } from '../../utils/custom-element.util';
import style from './avatar-image.css?raw';

export type AvatarImageProps = {
  alt?: string;
  size?: string;
  src?: string;
};

define<HTMLImageElement, AvatarImageProps>('ui-avatar-image', {
  observedAttributes: ['src', 'size', 'alt'],
  onAttributeChanged(name, _prev, curr, el) {
    if (name === 'size' && curr !== null) {
      el.style.setProperty('--avatar-size', curr);
    }
  },
  styles: [style],
  template: (el: any) => /* html */ `
    <img class="avatar-image" alt="${el.alt || ''}" src="${el.src}" />
  `,
});
