import { markup } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
  url?: string;
};

define<DataSet>('ui-card-image', {
  data: {
    append: undefined,
    url: undefined
  },
  template: ({ dataset }) => {
    const { link, img, slot } = markup;
    return [
      link({ rel: 'stylesheet', href: '/tailwind.css' }),
      img(
        {
          className: classMap('w-auto h-full object-cover', dataset.append),
          src: dataset.url,
          alt: ''
        },
        slot()
      )
    ];
  }
});
