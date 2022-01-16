import { dom } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

define<DataSet>('ui-card-header', {
  data: {
    append: undefined
  },
  template: ({ dataset, classList }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('header', { className: 'align-middle text-content text-xl font-medium' }, dom('slot'))
  ]
});
