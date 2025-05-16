import loadingIcon from '../../assets/icons/loading.icon.svg?raw';
import { classMap, define } from '../../utils/custom-element.util';
import style from './button.css?raw';

export type Props = {
  dataset: {
    block?: string;
    circle?: string;
    color?: Exclude<UIColor, 'info' | 'warning'>;
    disabled?: string;
    group?: string;
    loading?: string;
    rounded?: string;
    size?: UISizes;
    variant?: 'outline' | 'text';
  };
  type?: 'button' | 'submit' | 'reset';
};

const getClassName = ({ dataset }: Props) =>
  classMap('btn', {
    [`is-${dataset.color}`]: dataset.color,
    [`is-${dataset.size}`]: dataset.size,
    [`is-${dataset.variant}`]: dataset.variant,
    'is-block': dataset.block === '',
    'is-circle': dataset.circle === '',
    'is-disabled': dataset.disabled === '',
    'is-first': dataset.group === 'first',
    'is-group': dataset.group === '',
    'is-last': dataset.group === 'last',
    'is-loading': dataset.loading === '',
    'is-rounded': dataset.rounded === '',
  });

define<HTMLButtonElement>('ui-button', {
  observedAttributes: ['data-block', 'data-disabled', 'data-loading'],
  onAttributeChanged: (name, prev, curr, el) => {
    if (!el.rootElement) return;

    switch (name) {
      case 'data-block':
        el.rootElement.className = getClassName(el);
        el.style.width = el.dataset.block === '' ? '100%' : '';
        break;
      case 'data-disabled':
        el.rootElement.className = getClassName(el);
        el.rootElement.disabled = curr !== null;
        break;
      case 'data-loading':
        el.rootElement.className = getClassName(el);

        if (curr === null) {
          el.rootElement.querySelector('svg')?.remove();
        } else {
          el.rootElement.prepend(new DOMParser().parseFromString(loadingIcon, 'image/svg+xml').firstChild!);
        }

        break;
    }
  },
  styles: [style],
  template: (el) => /*html*/ `
    <button type="${el.type}" class="${getClassName(el)}" title="${el.children[0]?.textContent ?? undefined}">
      <slot></slot>
    </button>
  `,
});
