import { markup } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type DataSet = {
  append?: string;
  horizontal?: boolean;
};

define<DataSet>('ui-card', {
  data: {
    append: undefined,
    horizontal: undefined
  },
  template: ({ dataset }) => {
    const { link, div, slot } = markup;
    return [
      link({ rel: 'stylesheet', href: '/tailwind.css' }),
      div(
        {
          className: classMap(
            'flex justify-center rounded-lg shadow-lg bg-white dark:bg-canvas border border-contrast-200 max-w-sm overflow-hidden',
            dataset.horizontal ? 'flex-row' : 'flex-col',
            dataset.append
          )
        },
        slot()
      )
    ];
  }
});
