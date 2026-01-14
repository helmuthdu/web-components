import { isArray, isObject, isString } from './type-check.util';

/**
 * Creates a space-separated string of class names from various input types.
 * Deduplicates classes and handles nested arrays, objects, and strings.
 *
 * @param args - Classes to process (strings, arrays, or objects).
 * @returns A space-separated string of class names.
 */
export const classMap = (...args: unknown[]): string => {
  const classes = new Set<string>();

  const process = (val: unknown): void => {
    if (isString(val)) {
      if (val) {
        const parts = val.split(/\s+/);

        for (let i = 0; i < parts.length; i++) {
          if (parts[i]) classes.add(parts[i]);
        }
      }
    } else if (isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        process(val[i]);
      }
    } else if (isObject(val)) {
      for (const [key, enabled] of Object.entries(val as object)) {
        if (enabled) {
          const parts = key.split(/\s+/);

          for (let i = 0; i < parts.length; i++) {
            if (parts[i]) classes.add(parts[i]);
          }
        }
      }
    }
  };

  for (let i = 0; i < args.length; i++) {
    process(args[i]);
  }

  return Array.from(classes).join(' ');
};

const styleCache = new Map<string, CSSStyleSheet>();

/**
 * Loads and caches CSSStyleSheet objects from strings or existing sheets.
 * Optimized for performance by streamlining promise handling and caching.
 *
 * @param payload - Array of CSSStyleSheets, strings, or promises resolving to them.
 * @returns A promise that resolves to an array of CSSStyleSheet objects.
 */
export const loadCSSStyleSheets = async (
  payload: (CSSStyleSheet | string | Promise<CSSStyleSheet | string>)[] = [],
): Promise<CSSStyleSheet[]> => {
  if (!payload?.length) return [];

  return Promise.all(
    payload.map(async (item) => {
      const style = await item;
      const sheet = (style as any)?.default ?? style;

      if (sheet instanceof CSSStyleSheet) return sheet;

      if (isString(sheet)) {
        const cached = styleCache.get(sheet);

        if (cached) return cached;

        const cssSheet = new CSSStyleSheet();

        await cssSheet.replace(sheet);
        styleCache.set(sheet, cssSheet);

        return cssSheet;
      }

      throw new Error('Invalid CSS in styles');
    }),
  );
};
