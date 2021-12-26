import { define } from '../../utils/component.util';
import { pickClassNames } from '../../utils/styling.util';

export type Attributes = {
  append?: string;
};

export const attributes: Attributes = {
  append: undefined
};

const getClassNames = (attrs: Attributes) => {
  return pickClassNames(
    attrs.append,
    'block bg-white border-1 border-gray-300 text-content dark:bg-zinc-800 dark:border-zinc-700 dark:text-white shadow-md rounded-lg p-5'
  );
};

define('tw-box', {
  attributes,
  render: (attrs: Attributes) =>
    `
      <link rel="stylesheet" href="/tailwind.css" />
      <div ref="box" class="${getClassNames(attrs)}">
        <slot></slot>
      </div>
    `
});
