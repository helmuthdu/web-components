import { markup } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

define<DataSet>('ui-card-footer', {
  data: {
    append: undefined
  },
  template: ({ dataset }) => {
    const { link, footer, slot } = markup;
    return [
      link({ rel: 'stylesheet', href: '/tailwind.css' }),
      footer({ className: classMap('inline-flex gap-2 w-full', dataset.append) }, slot())
    ];
  }
});
