import { define, html } from 'hybrids';
import clsx from 'clsx';

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
type Gap = number | { x: number; y: number };
type Breakpoints = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ColumnsProps = {
  cols?: Cols;
  gap?: Gap;
} & {
  [Key in Breakpoints]?: {
    cols?: Cols;
    gap?: Gap;
  };
};

export default define<ColumnsProps>({
  tag: 'wb-grid',
  cols: 1,
  gap: undefined,
  xxl: undefined,
  xl: undefined,
  lg: undefined,
  md: undefined,
  sm: undefined,
  render: ({ cols, gap, sm, md, lg, xl, xxl }) => html`
    <div
      class="${clsx(
        'grid',
        {
          [`grid-cols-${cols}`]: cols !== undefined,
          [`sm:grid-cols-${sm?.cols}`]: sm?.cols !== undefined,
          [`md:grid-cols-${md?.cols}`]: md?.cols !== undefined,
          [`lg:grid-cols-${lg?.cols}`]: lg?.cols !== undefined,
          [`xl:grid-cols-${xl?.cols}`]: xl?.cols !== undefined,
          [`2xl:grid-cols-${xxl?.cols}`]: xxl?.cols !== undefined
        },
        typeof gap === 'number' ||
          typeof sm?.gap === 'number' ||
          typeof md?.gap === 'number' ||
          typeof lg?.gap === 'number' ||
          typeof xl?.gap === 'number' ||
          typeof xxl?.gap === 'number'
          ? {
              [`gap-${gap}`]: gap !== undefined,
              [`sm:gap-${sm?.gap}`]: sm?.gap !== undefined,
              [`md:gap-${md?.gap}`]: md?.gap !== undefined,
              [`lg:gap-${lg?.gap}`]: lg?.gap !== undefined,
              [`xl:gap-${xl?.gap}`]: xl?.gap !== undefined,
              [`2xl:gap-${xxl?.gap}`]: xxl?.gap !== undefined
            }
          : {
              [`gap-x-${gap?.x}`]: gap?.x !== undefined,
              [`gap-y-${gap?.y}`]: gap?.y !== undefined,
              [`sm:gap-x-${sm?.gap?.x}`]: sm?.gap?.x !== undefined,
              [`sm:gap-y-${sm?.gap?.y}`]: sm?.gap?.y !== undefined,
              [`md:gap-x-${md?.gap?.x}`]: md?.gap?.x !== undefined,
              [`md:gap-y-${md?.gap?.y}`]: md?.gap?.y !== undefined,
              [`lg:gap-x-${lg?.gap?.x}`]: lg?.gap?.x !== undefined,
              [`lg:gap-y-${lg?.gap?.y}`]: lg?.gap?.y !== undefined,
              [`xl:gap-x-${xl?.gap?.x}`]: xl?.gap?.x !== undefined,
              [`xl:gap-y-${xl?.gap?.y}`]: xl?.gap?.y !== undefined,
              [`2xl:gap-x-${xxl?.gap?.x}`]: xxl?.gap?.x !== undefined,
              [`2xl:gap-y-${xxl?.gap?.y}`]: xxl?.gap?.y !== undefined
            }
      )}">
      <slot name="default"></slot>
    </div>
  `
});
