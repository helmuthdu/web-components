import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

define<DataSet>('ui-card-meta', {
  data: {
    append: undefined
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom('span', { className: classMap('block text-sm text-content-tertiary', dataset.append) }, dom('slot'))
  ]
});
