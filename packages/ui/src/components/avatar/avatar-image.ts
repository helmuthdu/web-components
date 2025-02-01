import { define } from '../../utils/custom-element.util';
import style from './avatar-image.css?raw';

export type Props = {
  dataset: {
    size?: string;
    src?: string;
  };
};

define<HTMLImageElement>('ui-avatar-image', {
  observedAttributes: ['data-size'],
  onAttributeChanged(name, _prev, curr, el) {
    switch (name) {
      case 'data-size':
        el.rootElement.style.setProperty('--avatar-size', curr);
        break;
    }
  },
  styles: [style],
  template: (el) => /* html */ `
    <img class="avatar-image" alt="" src="${el.dataset.src}" />
  `,
});
