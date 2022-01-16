import { classMap, define } from '../../lib/custom-element';
import { dom } from '../../lib/create-element';

export type DataSet = {
  append?: string;
  url?: string;
};

define<DataSet>('ui-card-image', {
  data: {
    append: undefined,
    url: undefined
  },
  template: ({ dataset }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom(
      'img',
      {
        className: classMap('w-auto h-full object-cover', dataset.append),
        src: dataset.url,
        alt: ''
      },
      dom('slot')
    )
  ]
});
