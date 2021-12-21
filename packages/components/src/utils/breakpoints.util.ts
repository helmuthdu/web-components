export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const getBreakpointProps = <T extends string>(prop: T) => {
  return (['sm', 'md', 'lg', 'xl', '2xl'] as Breakpoint[]).reduce(
    (out, bkp) => ({ ...out, [`${prop}-${bkp}`]: undefined }),
    {} as Record<`${T}-${Breakpoint}`, any>
  );
};

export const getBreakpointClasses = <T>(options: T, props: any) => {
  return (['sm', 'md', 'lg', 'xl', '2xl'] as Breakpoint[]).reduce((out, bkp) => {
    const entries = Object.entries(options) as Entries<T>;
    return {
      ...out,
      ...entries.reduce((acc, [key, val]) => {
        const prop = props[`${val}-${bkp}`];
        if (prop) {
          if (typeof prop === 'object') {
            Object.entries(prop).forEach(([k, v]) => {
              (acc as any)[`${bkp}:${key}-${k}-${prop[k]}`] = v;
            });
          } else {
            (acc as any)[`${bkp}:${key}-${prop}`] = prop;
          }
        }
        return acc;
      }, {} as Record<string, string | number>)
    };
  }, {});
};

export const modifier = {
  defaultProps: {},
  getClassName: <T extends any>(props: T) => props,
  clean: <T>(props: T) => props
};

export default modifier;
