import { define } from '../../utils/component.util';
import { pickClassNames } from '../../utils/styling.util';

export type Attributes = {
  append?: string;
};

export const attributes: Attributes = {
  append: undefined
};

const getClassNames = (attrs: Attributes) => {
  return pickClassNames(attrs.append, 'inline-flex rounded-md shadow-sm');
};

define('tw-button-group', {
  attributes,
  render: (attrs: Attributes) =>
    `
      <link rel="stylesheet" href="/tailwind.css" />
      <div ref="button-group" class="${getClassNames(attrs)}">
        <slot></slot>
      </div>
    `
});
