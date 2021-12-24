export const pickClassNames = (...classes: unknown[]) =>
  classes
    .reduce((acc: string, arg: any) => {
      if (typeof arg === 'string') {
        acc += `${arg} `;
      } else if (typeof arg === 'object') {
        Object.entries(arg)
          .filter(([_, valid]) => valid)
          .forEach(([key]) => {
            acc += `${key} `;
          });
      }
      return acc;
    }, '')
    .trim();
