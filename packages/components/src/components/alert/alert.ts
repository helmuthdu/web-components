import { define, event, uuid } from '../../utils/component.util';
import { pickClassNames } from '../../utils/styling.util';
import { Color } from '../../types';

export type Attributes = {
  append?: string;
  variant?: Color;
};

export const attributes: Attributes = {
  append: undefined,
  variant: 'neutral'
};

const pickColorClasses = (attrs: Attributes) => {
  return pickClassNames({
    'text-slate-700 bg-slate-100 border-slate-200 dark:text-slate-800 dark:bg-slate-200 dark:border-slate-300':
      attrs.variant === 'slate',
    'text-gray-700 bg-gray-100 border-gray-200 dark:text-gray-800 dark:bg-gray-200 dark:border-gray-300':
      attrs.variant === 'gray',
    'text-zinc-700 bg-zinc-100 border-zinc-200 dark:text-zinc-800 dark:bg-zinc-200 dark:border-zinc-300':
      attrs.variant === 'zinc',
    'text-neutral-700 bg-neutral-100 border-neutral-200 dark:text-neutral-800 dark:bg-neutral-200 dark:border-neutral-300':
      attrs.variant === 'neutral',
    'text-red-700 bg-red-100 border-red-200 dark:text-red-800 dark:bg-red-200 dark:border-red-300':
      attrs.variant === 'red',
    'text-orange-700 bg-orange-100 border-orange-200 dark:text-orange-800 dark:bg-orange-200 dark:border-orange-300':
      attrs.variant === 'orange',
    'text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-800 dark:bg-amber-200 dark:border-amber-300':
      attrs.variant === 'amber',
    'text-yellow-700 bg-yellow-100 border-yellow-200 dark:text-yellow-800 dark:bg-yellow-200 dark:border-yellow-300':
      attrs.variant === 'yellow',
    'text-lime-700 bg-lime-100 border-lime-200 dark:text-lime-800 dark:bg-lime-200 dark:border-lime-300':
      attrs.variant === 'lime',
    'text-green-700 bg-green-100 border-green-200 dark:text-green-800 dark:bg-green-200 dark:border-green-300':
      attrs.variant === 'green',
    'text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-800 dark:bg-emerald-200 dark:border-emerald-300':
      attrs.variant === 'emerald',
    'text-teal-700 bg-teal-100 border-teal-200 dark:text-teal-800 dark:bg-teal-200 dark:border-teal-300':
      attrs.variant === 'teal',
    'text-cyan-700 bg-cyan-100 border-cyan-200 dark:text-cyan-800 dark:bg-cyan-200 dark:border-cyan-300':
      attrs.variant === 'cyan',
    'text-sky-700 bg-sky-100 border-sky-200 dark:text-sky-800 dark:bg-sky-200 dark:border-sky-300':
      attrs.variant === 'sky',
    'text-blue-700 bg-blue-100 border-blue-200 dark:text-blue-800 dark:bg-blue-200 dark:border-blue-300':
      attrs.variant === 'blue',
    'text-indigo-700 bg-indigo-100 border-indigo-200 dark:text-indigo-800 dark:bg-indigo-200 dark:border-indigo-300':
      attrs.variant === 'indigo',
    'text-violet-700 bg-violet-100 border-violet-200 dark:text-violet-800 dark:bg-violet-200 dark:border-violet-300':
      attrs.variant === 'violet',
    'text-purple-700 bg-purple-100 border-purple-200 dark:text-purple-800 dark:bg-purple-200 dark:border-purple-300':
      attrs.variant === 'purple',
    'text-fuchsia-700 bg-fuchsia-100 border-fuchsia-200 dark:text-fuchsia-800 dark:bg-fuchsia-200 dark:border-fuchsia-300':
      attrs.variant === 'fuchsia',
    'text-pink-700 bg-pink-100 border-pink-200 dark:text-pink-800 dark:bg-pink-200 dark:border-pink-300':
      attrs.variant === 'pink',
    'text-rose-700 bg-rose-100 border-rose-200 dark:text-rose-800 dark:bg-rose-200 dark:border-rose-300':
      attrs.variant === 'rose'
  });
};

const getClassNames = (attrs: Attributes) => {
  return pickClassNames(
    attrs.append,
    'flex items-center p-4 text-sm border rounded-lg shadow-sm',
    pickColorClasses(attrs)
  );
};

define<Attributes>('tw-alert', {
  attributes,
  onConnected: host => {
    event.once('close', 'click', () => {
      host.remove();
    });
  },
  render: attrs => {
    const id = uuid();

    return `
      <link rel="stylesheet" href="/tailwind.css" />
      <div id="${id}" class="${getClassNames(attrs)}" role="alert">
        <div class="text-sm"><slot></slot></div>
        <button 
          ref="close"
          type="button" 
          class="inline-flex items-center ml-2 -mr-2 rounded-lg p-0.5 h-8 w-8 ${pickColorClasses(attrs)}" 
          data-collapse-toggle="${id}"
          aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    `;
  }
});
