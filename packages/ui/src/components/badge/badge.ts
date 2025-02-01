import { classMap, define } from '../../utils/custom-element.util';
import style from './badge.css?raw';

export type Props = {
  dataset: {
    color?: Exclude<UIColor, 'primary' | 'warning'>;
    pill?: string;
    size?: UISizes;
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('badge', {
    [`is-${dataset.color}`]: dataset.color,
    [`is-${dataset.size}`]: dataset.size,
    'is-pill': dataset.pill === '',
  });

define('ui-badge', {
  styles: [style],
  template: (el) => /* html */ `
    <span class="${getClassName(el)}">
      <slot></slot>
    </span>
  `,
});
