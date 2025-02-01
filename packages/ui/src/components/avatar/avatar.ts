import { classMap, define } from '../../utils/custom-element.util';
import style from './avatar.css?raw';

export type Props = {
  dataset: {
    variant?: 'circle' | 'rounded';
  };
};

const getClassName = ({ dataset }: Props) =>
  classMap('avatar', {
    [`is-${dataset.variant}`]: dataset.variant,
  });

define('ui-avatar', {
  styles: [style],
  template: (el) => /* html */ `
    <div class="${getClassName(el)}">
      <slot></slot>
    </div>
  `,
});
