import loadingIcon from '../../assets/icons/loading.icon.svg?raw';
import { classMap, define } from '../../utils/custom-element.util';
import style from './button.css?raw';

type ButtonProps = {
  block?: string;
  circle?: string;
  color?: Exclude<UIColor, 'info' | 'warning'>;
  disabled?: string;
  group?: string;
  loading?: string;
  rounded?: string;
  size?: UISizes;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'outline' | 'text';
};

define<HTMLButtonElement, ButtonProps>('ui-button', {
  observedAttributes: [
    'block',
    'circle',
    'color',
    'disabled',
    'group',
    'loading',
    'rounded',
    'size',
    'variant',
    'type',
  ],
  onAttributeChanged: (name, _prev, _curr, el) => {
    if (name === 'block') {
      el.style.width = el.block ? '100%' : '';
    }
  },
  styles: [style],
  template: (el) => /*html*/ `
    <button
      class="${classMap('btn', {
        [`is-${el.color}`]: el.color,
        [`is-${el.size}`]: el.size,
        [`is-${el.variant}`]: el.variant,
        'is-block': !!el.block,
        'is-circle': !!el.circle,
        'is-disabled': !!el.disabled,
        'is-first': el.group === 'first',
        'is-group': !!el.group,
        'is-last': el.group === 'last',
        'is-loading': !!el.loading,
        'is-rounded': !!el.rounded,
      })}"
      type="${el.type ?? 'button'}"
      ${el.disabled ? 'disabled' : ''}
      title="${el.textContent?.trim() ?? ''}">
      ${el.loading ? loadingIcon : ''}
      <slot></slot>
    </button>
  `,
});
