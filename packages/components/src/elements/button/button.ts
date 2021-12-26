import type { Color, Sizes } from '../../types';
import { define, ref } from '../../utils/component.util';
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
        hasValue(attrs.outline) ? { [`text-${attrs.variant}-500`]: attrs.variant } : 'text-white',
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
      ? `bg-neutral-500 border-opacity-0 bg-opacity-20 
        ${hasValue(attrs.loading) ? 'text-transparent' : 'text-neutral-600/25'}`
      : hasValue(attrs.outline)
      ? {
          'bg-transparent border-2': true,
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-slate-500 hover:text-slate-600'
          } border-slate-500 hover:border-slate-600`]: attrs.variant === 'slate',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-gray-500 hover:text-gray-600'
          } border-gray-500 hover:border-gray-600`]: attrs.variant === 'gray',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-zinc-500 hover:text-zinc-600'
          } border-zinc-500 hover:border-zinc-600`]: attrs.variant === 'zinc',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-neutral-500 hover:text-neutral-600'
          } border-neutral-500 hover:border-neutral-600`]: attrs.variant === 'neutral',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-stone-500 hover:text-stone-600'
          } border-stone-500 hover:border-stone-600`]: attrs.variant === 'stone',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-red-500 hover:text-red-600'
          } border-red-500 hover:border-red-600`]: attrs.variant === 'red',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-orange-500 hover:text-orange-600'
          } border-orange-500 hover:border-orange-600`]: attrs.variant === 'orange',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-amber-500 hover:text-amber-600'
          } border-amber-500 hover:border-amber-600`]: attrs.variant === 'amber',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-yellow-500 hover:text-yellow-600'
          } border-yellow-500 hover:border-yellow-600`]: attrs.variant === 'yellow',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-lime-500 hover:text-lime-600'
          } border-lime-500 hover:border-lime-600`]: attrs.variant === 'lime',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-green-500 hover:text-green-600'
          } border-green-500 hover:border-green-600`]: attrs.variant === 'green',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-emerald-500 hover:text-emerald-600'
          } border-emerald-500 hover:border-emerald-600`]: attrs.variant === 'emerald',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-teal-500 hover:text-teal-600'
          } border-teal-500 hover:border-teal-600`]: attrs.variant === 'teal',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-cyan-500 hover:text-cyan-600'
          } border-cyan-500 hover:border-cyan-600`]: attrs.variant === 'cyan',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-sky-500 hover:text-sky-600'
          } border-sky-500 hover:border-sky-600`]: attrs.variant === 'sky',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-blue-500 hover:text-blue-600'
          } border-blue-500 hover:border-blue-600`]: attrs.variant === 'blue',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-indigo-500 hover:text-indigo-600'
          } border-indigo-500 hover:border-indigo-600`]: attrs.variant === 'indigo',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-violet-500 hover:text-violet-600'
          } border-violet-500 hover:border-violet-600`]: attrs.variant === 'violet',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-purple-500 hover:text-purple-600'
          } border-purple-500 hover:border-purple-600`]: attrs.variant === 'purple',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-fuchsia-500 hover:text-fuchsia-600'
          } border-fuchsia-500 hover:border-fuchsia-600`]: attrs.variant === 'fuchsia',
          [`${
            hasValue(attrs.loading) ? 'text-transparent' : 'text-pink-500 hover:text-pink-600'
          } border-pink-500 hover:border-pink-600`]: attrs.variant === 'pink',
          [`${
            hasValue(attrs.loading) ? 'text-transparent ' : 'text-rose-500 hover:text-rose-600 '
          } border-rose-500 hover:border-rose-600`]: attrs.variant === 'rose'
        }
      : {
          'border-none': true,
          'text-white': !hasValue(attrs.loading),
          'text-transparent': hasValue(attrs.loading),
          'bg-slate-500 hover:bg-slate-600': attrs.variant === 'slate',
          'bg-gray-500 hover:bg-gray-600': attrs.variant === 'gray',
          'bg-zinc-500 hover:bg-zinc-600': attrs.variant === 'zinc',
          'bg-neutral-500 hover:bg-neutral-600': attrs.variant === 'neutral',
          'bg-stone-500 hover:bg-stone-600': attrs.variant === 'stone',
          'bg-red-500 hover:bg-red-600': attrs.variant === 'red',
          'bg-orange-500 hover:bg-orange-600': attrs.variant === 'orange',
          'bg-amber-500 hover:bg-amber-600': attrs.variant === 'amber',
          'bg-yellow-500 hover:bg-yellow-600': attrs.variant === 'yellow',
          'bg-lime-500 hover:bg-lime-600': attrs.variant === 'lime',
          'bg-green-500 hover:bg-green-600': attrs.variant === 'green',
          'bg-emerald-500 hover:bg-emerald-600': attrs.variant === 'emerald',
          'bg-teal-500 hover:bg-teal-600': attrs.variant === 'teal',
          'bg-cyan-500 hover:bg-cyan-600': attrs.variant === 'cyan',
          'bg-sky-500 hover:bg-sky-600': attrs.variant === 'sky',
          'bg-blue-500 hover:bg-blue-600': attrs.variant === 'blue',
          'bg-indigo-500 hover:bg-indigo-600': attrs.variant === 'indigo',
          'bg-violet-500 hover:bg-violet-600': attrs.variant === 'violet',
          'bg-purple-500 hover:bg-purple-600': attrs.variant === 'purple',
          'bg-fuchsia-500 hover:bg-fuchsia-600': attrs.variant === 'fuchsia',
          'bg-pink-500 hover:bg-pink-600': attrs.variant === 'pink',
          'bg-rose-500 hover:bg-rose-600': attrs.variant === 'rose',
          'text-blue-500 hover:underline bg-transparent': attrs.variant === 'link'
        },
    !hasValue(attrs.group) &&
      !hasValue(attrs.disabled) && {
        'focus:ring-4 focus:ring-slate-400': attrs.variant === 'slate',
        'focus:ring-4 focus:ring-gray-400': attrs.variant === 'gray',
        'focus:ring-4 focus:ring-zinc-400': attrs.variant === 'zinc',
        'focus:ring-4 focus:ring-neutral-400': attrs.variant === 'neutral',
        'focus:ring-4 focus:ring-stone-400': attrs.variant === 'stone',
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

define<Attributes>('tw-button', {
  attributes,
  onAttributeChanged: (name, _prev, _curr, attrs) => {
    const el = ref('button');

    if (!el) {
      return false;
    }

    switch (name) {
      case 'append':
      case 'block':
      case 'circle':
      case 'disabled':
      case 'group':
      case 'outline':
      case 'rounded':
      case 'variant':
        el.className = getClassNames(attrs);
        return false;
      case 'loading':
        el.className = getClassNames(attrs);
        return true;
      default:
        return true;
    }
  },
  render: (attrs, host) => {
    if (hasValue(attrs.block)) {
      host.classList.add('w-full');
    } else {
      host.classList.remove('w-full');
    }

    return `
      <link rel="stylesheet" href="/tailwind.css" />
      <button ref="button" class="${getClassNames(attrs)}">
        ${hasValue(attrs.loading) ? renderLoading(attrs) : ''}
        <slot></slot>
      </button>
    `;
  }
});
