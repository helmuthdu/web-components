import type { Color, Sizes } from '../../types';
import { define, useElementRef } from '../../utils/component.util';
import { pickClassNames } from '../../utils/styling.util';

export type Attributes = {
  append?: string;
  block?: boolean;
  circle?: boolean;
  disabled?: boolean;
  group?: string;
  loading?: boolean;
  outline?: boolean;
  rounded?: boolean;
  size?: Sizes;
  type?: 'button' | 'reset' | 'submit';
  variant?: Color | 'link';
};

export const attributes: Attributes = {
  append: undefined,
  block: undefined,
  circle: undefined,
  disabled: undefined,
  group: undefined,
  loading: undefined,
  outline: undefined,
  rounded: undefined,
  size: 'md',
  type: 'button',
  variant: 'blue'
};

const hasValue = (value: any) => value === '' || value;

const renderLoading = (attrs: Attributes) => {
  return /*html*/ `
    <svg
      id="loading"
      class="${pickClassNames(
        'absolute animate-spin',
        hasValue(attrs.outline) ? { [`text-${attrs.variant}-600`]: attrs.variant } : 'text-white',
        {
          'h-3 w-3': attrs.size === 'xs',
          'h-4 w-4': attrs.size === 'sm',
          'h-5 w-5': attrs.size === 'md',
          'h-6 w-6': attrs.size === 'lg',
          'h-7 w-7': attrs.size === 'xl'
        }
      )}"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style="">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  `;
};

const getClassNames = (attrs: Attributes) => {
  return pickClassNames(
    attrs.append,
    'inline-flex flex-wrap items-center justify-center text-center',
    hasValue(attrs.loading) && 'text-transparent',
    'font-semibold border-transparent',
    !hasValue(attrs.group) && 'shadow-sm',
    hasValue(attrs.group) && !hasValue(attrs.circle)
      ? {
          '-mx-px': hasValue(attrs.outline),
          'rounded-l-lg': attrs.group === 'first',
          'rounded-r-lg': attrs.group === 'last'
        }
      : hasValue(attrs.rounded)
      ? 'rounded-full'
      : 'rounded-lg',
    hasValue(attrs.block) && 'w-full',
    hasValue(attrs.circle)
      ? {
          'rounded-full p-0': true,
          'h-8 w-8': attrs.size === 'xs',
          'h-10 w-10': attrs.size === 'sm',
          'h-12 w-12': attrs.size === 'md',
          'h-14 w-14': attrs.size === 'lg',
          'h-16 w-16': attrs.size === 'xl'
        }
      : hasValue(attrs.outline) && !hasValue(attrs.disabled)
      ? {
          'text-xs px-4 py-0.5 mt-0.5': attrs.size === 'xs',
          'text-sm px-4 py-1.5': attrs.size === 'sm',
          'text-base px-5 py-2.5': attrs.size === 'md',
          'text-lg px-5 py-3.5': attrs.size === 'lg',
          'text-xl px-6 py-3.5': attrs.size === 'xl'
        }
      : {
          'text-xs px-4 py-1': attrs.size === 'xs',
          'text-sm px-4 py-2': attrs.size === 'sm',
          'text-base px-5 py-3': attrs.size === 'md',
          'text-lg px-5 py-4': attrs.size === 'lg',
          'text-xl px-6 py-4': attrs.size === 'xl'
        },
    hasValue(attrs.disabled)
      ? 'bg-neutral-600 border-opacity-0 bg-opacity-20 text-neutral-700/25'
      : hasValue(attrs.outline)
      ? {
          'bg-transparent border-2': true,
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-slate-600 hover:text-slate-700'
          } border-slate-600 hover:border-slate-700`]: attrs.variant === 'slate',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-gray-600 hover:text-gray-700'
          } border-gray-600 hover:border-gray-700`]: attrs.variant === 'gray',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-zinc-600 hover:text-zinc-700'
          } border-zinc-600 hover:border-zinc-700`]: attrs.variant === 'zinc',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-neutral-600 hover:text-neutral-700'
          } border-neutral-600 hover:border-neutral-700`]: attrs.variant === 'neutral',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-red-600 hover:text-red-700'
          } border-red-600 hover:border-red-700`]: attrs.variant === 'red',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-orange-600 hover:text-orange-700'
          } border-orange-600 hover:border-orange-700`]: attrs.variant === 'orange',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-amber-600 hover:text-amber-700'
          } border-amber-600 hover:border-amber-700`]: attrs.variant === 'amber',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-yellow-600 hover:text-yellow-700'
          } border-yellow-600 hover:border-yellow-700`]: attrs.variant === 'yellow',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-lime-600 hover:text-lime-700'
          } border-lime-600 hover:border-lime-700`]: attrs.variant === 'lime',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-green-600 hover:text-green-700'
          } border-green-600 hover:border-green-700`]: attrs.variant === 'green',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-emerald-600 hover:text-emerald-700'
          } border-emerald-600 hover:border-emerald-700`]: attrs.variant === 'emerald',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-teal-600 hover:text-teal-700'
          } border-teal-600 hover:border-teal-700`]: attrs.variant === 'teal',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-cyan-600 hover:text-cyan-700'
          } border-cyan-600 hover:border-cyan-700`]: attrs.variant === 'cyan',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-sky-600 hover:text-sky-700'
          } border-sky-600 hover:border-sky-700`]: attrs.variant === 'sky',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-blue-600 hover:text-blue-700'
          } border-blue-600 hover:border-blue-700`]: attrs.variant === 'blue',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-indigo-600 hover:text-indigo-700'
          } border-indigo-600 hover:border-indigo-700`]: attrs.variant === 'indigo',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-violet-600 hover:text-violet-700'
          } border-violet-600 hover:border-violet-700`]: attrs.variant === 'violet',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-purple-600 hover:text-purple-700'
          } border-purple-600 hover:border-purple-700`]: attrs.variant === 'purple',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-fuchsia-600 hover:text-fuchsia-700'
          } border-fuchsia-600 hover:border-fuchsia-700`]: attrs.variant === 'fuchsia',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-pink-600 hover:text-pink-700'
          } border-pink-600 hover:border-pink-700`]: attrs.variant === 'pink',
          [`${
            hasValue(attrs.loading) ? 'text-transparent ' : 'text-rose-600 hover:text-rose-700 '
          } border-rose-600 hover:border-rose-700`]: attrs.variant === 'rose'
        }
      : {
          'border-none': true,
          'text-white': !hasValue(attrs.loading),
          'bg-slate-600 hover:bg-slate-700': attrs.variant === 'slate',
          'bg-gray-600 hover:bg-gray-700': attrs.variant === 'gray',
          'bg-zinc-600 hover:bg-zinc-700': attrs.variant === 'zinc',
          'bg-neutral-600 hover:bg-neutral-700': attrs.variant === 'neutral',
          'bg-red-600 hover:bg-red-700': attrs.variant === 'red',
          'bg-orange-600 hover:bg-orange-700': attrs.variant === 'orange',
          'bg-amber-600 hover:bg-amber-700': attrs.variant === 'amber',
          'bg-yellow-600 hover:bg-yellow-700': attrs.variant === 'yellow',
          'bg-lime-600 hover:bg-lime-700': attrs.variant === 'lime',
          'bg-green-600 hover:bg-green-700': attrs.variant === 'green',
          'bg-emerald-600 hover:bg-emerald-700': attrs.variant === 'emerald',
          'bg-teal-600 hover:bg-teal-700': attrs.variant === 'teal',
          'bg-cyan-600 hover:bg-cyan-700': attrs.variant === 'cyan',
          'bg-sky-600 hover:bg-sky-700': attrs.variant === 'sky',
          'bg-blue-600 hover:bg-blue-700': attrs.variant === 'blue',
          'bg-indigo-600 hover:bg-indigo-700': attrs.variant === 'indigo',
          'bg-violet-600 hover:bg-violet-700': attrs.variant === 'violet',
          'bg-purple-600 hover:bg-purple-700': attrs.variant === 'purple',
          'bg-fuchsia-600 hover:bg-fuchsia-700': attrs.variant === 'fuchsia',
          'bg-pink-600 hover:bg-pink-700': attrs.variant === 'pink',
          'bg-rose-600 hover:bg-rose-700': attrs.variant === 'rose',
          'text-blue-600 hover:underline bg-transparent': attrs.variant === 'link'
        },
    !hasValue(attrs.group) &&
      !hasValue(attrs.disabled) && {
        'focus:ring-4 focus:ring-slate-400': attrs.variant === 'slate',
        'focus:ring-4 focus:ring-gray-400': attrs.variant === 'gray',
        'focus:ring-4 focus:ring-zinc-400': attrs.variant === 'zinc',
        'focus:ring-4 focus:ring-neutral-400': attrs.variant === 'neutral',
        'focus:ring-4 focus:ring-red-400': attrs.variant === 'red',
        'focus:ring-4 focus:ring-orange-400': attrs.variant === 'orange',
        'focus:ring-4 focus:ring-amber-400': attrs.variant === 'amber',
        'focus:ring-4 focus:ring-yellow-400': attrs.variant === 'yellow',
        'focus:ring-4 focus:ring-lime-400': attrs.variant === 'lime',
        'focus:ring-4 focus:ring-green-400': attrs.variant === 'green',
        'focus:ring-4 focus:ring-emerald-400': attrs.variant === 'emerald',
        'focus:ring-4 focus:ring-teal-400': attrs.variant === 'teal',
        'focus:ring-4 focus:ring-cyan-400': attrs.variant === 'cyan',
        'focus:ring-4 focus:ring-sky-400': attrs.variant === 'sky',
        'focus:ring-4 focus:ring-blue-400': attrs.variant === 'blue',
        'focus:ring-4 focus:ring-indigo-400': attrs.variant === 'indigo',
        'focus:ring-4 focus:ring-violet-400': attrs.variant === 'violet',
        'focus:ring-4 focus:ring-purple-400': attrs.variant === 'purple',
        'focus:ring-4 focus:ring-fuchsia-400': attrs.variant === 'fuchsia',
        'focus:ring-4 focus:ring-pink-400': attrs.variant === 'pink',
        'focus:ring-4 focus:ring-rose-400': attrs.variant === 'rose'
      }
  );
};

define('tw-button', {
  attributes,
  onAttributeChanged: (name, _prev, _curr, attrs) => {
    const el = useElementRef('button');

    switch (name) {
      case 'append':
      case 'block':
      case 'circle':
      case 'disabled':
      case 'group':
      case 'outline':
      case 'rounded':
      case 'variant':
        if (el) {
          el.className = getClassNames(attrs);
        }
        return false;
      case 'loading':
        if (el) {
          el.className = getClassNames(attrs);
        }
        return true;
      default:
        return true;
    }
  },
  render: attrs =>
    `
      <link rel="stylesheet" href="/tailwind.css" />
      <button ref="button" class="${getClassNames(attrs)}">
        ${hasValue(attrs.loading) ? renderLoading(attrs) : ''}
        <slot></slot>
      </button>
    `
});
