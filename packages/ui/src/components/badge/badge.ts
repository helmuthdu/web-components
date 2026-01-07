import { classMap, define } from '../../utils/custom-element.util';
import style from './badge.css?raw';

type BadgeProps = {
  color: Exclude<UIColor, 'primary' | 'warning'>;
  pill: string | null;
  size: UISizes | 'xxs';
};

define<HTMLElement, BadgeProps>('ui-badge', {
  observedAttributes: ['color', 'size', 'pill'],
  styles: [style],
  template: (el) => /* html */ `
    <span class="${classMap('badge', {
      [`is-${el.color}`]: el.color,
      [`is-${el.size}`]: el.size,
      'is-pill': !!el.pill,
    })}">
      <slot></slot>
    </span>
  `,
});
