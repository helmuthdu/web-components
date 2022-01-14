import { markup } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

define<DataSet>('ui-card-meta', {
  data: {
    append: undefined
  },
  template: ({ dataset }) => {
    const { link, span, slot } = markup;
    return [
      link({ rel: 'stylesheet', href: '/tailwind.css' }),
      span({ className: classMap('block text-sm text-content-tertiary', dataset.append) }, slot())
    ];
  }
});
