import clsx from 'clsx';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const modifier = {
  defaultProps: {},
  getClassName: <T>(props: T) =>
    clsx(
      (['sm', 'md', 'lg', 'xl', '2xl'] as Breakpoint[]).reduce((bkps, bkp) => {
        const entries = Object.entries(props) as Entries<T>;
        return {
          ...bkps,
          ...entries.reduce((acc, [key, val]) => {
            (acc as any)[`${bkp}:${key}`] = val;
            return acc;
          }, {} as Record<`${Breakpoint}:${string & keyof T}`, T[keyof T]>)
        };
      }, {})
    ),
  clean: <T>(props: T) => props
};

export default modifier;
