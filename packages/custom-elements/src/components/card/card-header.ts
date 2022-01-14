import { markup } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

define<DataSet>('ui-card-header', {
  data: {
    append: undefined
  },
  template: ({ dataset, classList }) => {
    const { link, header, slot } = markup;
    return [
      link({ rel: 'stylesheet', href: '/tailwind.css' }),
      header({ className: 'align-middle text-content text-xl font-medium' }, slot())
    ];
  }
});
