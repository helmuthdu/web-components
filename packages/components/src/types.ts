export type Display = 'block' | 'flex' | 'inline' | 'inline-block' | 'inline-flex';

export type TextAlignment = 'centered' | 'justified' | 'left' | 'right';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'widescreen' | 'fullhd' | 'touch';

export type ColorVariant = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type Color =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

export type BackgroundColor = `bg-${Color}-${ColorVariant}`;

export type TextColor =
  | 'text-inherit'
  | 'text-current'
  | 'text-transparent'
  | 'text-black'
  | 'text-white'
  | `text-${Color}-${ColorVariant}`;

export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
