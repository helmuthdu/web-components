import { isObject, isString } from './type-check.util';

export const classMap = (...classes: unknown[]): string =>
  classes
    .flatMap((arg) => {
      if (isString(arg)) return arg;

      if (isObject(arg))
        return Object.entries(arg)
          .filter(([_, valid]) => valid)
          .map(([key]) => key);

      return [];
    })
    .join(' ');

export const createCSSStyleSheets = async (
  payload: (string | CSSStyleSheet | { default?: string | CSSStyleSheet })[] = [],
): Promise<CSSStyleSheet[]> => {
  if (!payload.length) return [];

  const styles = await Promise.all(payload);

  return Promise.all(
    styles.map((style) => {
      const sheet = (style as any).default ?? style;

      if (isString(sheet)) {
        return new CSSStyleSheet().replace(sheet);
      } else if (sheet instanceof CSSStyleSheet) {
        return Promise.resolve(sheet);
      }

      return Promise.reject(new Error('Invalid CSS in styles'));
    }),
  );
};
