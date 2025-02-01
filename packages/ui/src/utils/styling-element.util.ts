import { isObject, isString } from './type-check.util';

export const classMap = (...classes: unknown[]) =>
  classes
    .reduce((acc: string, arg: unknown) => {
      if (isString(arg)) {
        acc += `${arg} `;
      } else if (isObject(arg)) {
        Object.entries(arg as object)
          .filter(([_, valid]) => valid)
          .forEach(([key]) => {
            acc += `${key} `;
          });
      }

      return acc;
    }, '')
    .trim();

export const createCSSStyleSheets = async (payload: unknown[] = []) => {
  if ((payload ?? []).length) {
    return Promise.all(payload).then((styles) =>
      Promise.all(
        styles.map((style: any) => {
          const sheet = style.default ?? style;

          if (isString(sheet)) {
            return new CSSStyleSheet().replace(sheet);
          } else if (sheet instanceof CSSStyleSheet) {
            return Promise.resolve(sheet);
          }

          throw new Error(`invalid css in styles`);
        }),
      ),
    );
  }

  return Promise.resolve();
};
