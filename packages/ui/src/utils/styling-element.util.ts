import { isArray, isObject, isString } from './type-check.util';

export const classMap = (...classes: unknown[]): string => {
  const result = new Set<string>();

  const process = (arg: unknown) => {
    if (isString(arg)) {
      arg
        .split(/\s+/)
        .filter(Boolean)
        .forEach((c) => result.add(c));
    } else if (isArray(arg)) {
      arg.forEach(process);
    } else if (isObject(arg)) {
      Object.entries(arg as Record<string, any>).forEach(([key, value]) => {
        if (value) {
          key
            .split(/\s+/)
            .filter(Boolean)
            .forEach((c) => result.add(c));
        }
      });
    }
  };

  classes.forEach(process);

  return Array.from(result).join(' ');
};

const styleCache = new Map<string, CSSStyleSheet>();

export const loadCSSStyleSheets = async (payload: (CSSStyleSheet | string)[] = []): Promise<CSSStyleSheet[]> => {
  if (!payload?.length) return [];

  const styles = await Promise.all(payload);

  return Promise.all(
    styles.map(async (style) => {
      const sheet = (style as any).default ?? style;

      if (sheet instanceof CSSStyleSheet) return sheet;

      if (isString(sheet)) {
        if (styleCache.has(sheet)) {
          return styleCache.get(sheet)!;
        }

        const cssSheet = new CSSStyleSheet();

        await cssSheet.replace(sheet);
        styleCache.set(sheet, cssSheet);

        return cssSheet;
      }

      throw new Error('Invalid CSS in styles');
    }),
  );
};
