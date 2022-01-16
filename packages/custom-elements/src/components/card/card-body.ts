import { dom } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
};

define<DataSet>('ui-card-body', {
  data: {
    append: undefined
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom(
      'section',
      { className: classMap('flex flex-col gap-2 text-base text-content p-4', dataset.append) },
      dom('slot')
    )
  ]
});
