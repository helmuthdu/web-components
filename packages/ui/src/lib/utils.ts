export const isArray = Array.isArray;
export const isBoolean = (arg: unknown) => typeof arg === 'boolean';
export const isFunction = (arg: unknown) => typeof arg === 'function';
export const isNil = (arg: unknown) => arg === undefined || arg === null;
export const isNumber = (arg: unknown) => typeof arg === 'number';
export const isObject = (arg: unknown) => typeof arg === 'object' && arg !== null;
export const isString = (arg: unknown) => typeof arg === 'string';
export const isSVG = (tag: string) => {
  const regex = new RegExp(`^${tag}$`, 'i');
  return ['path', 'circle', 'rect', 'svg', 'use', 'g'].some(tag => regex.test(tag));
};

export const debounce = <T extends (...args: unknown[]) => void>(fn: T, ms = 0, immediate?: boolean) => {
  let timeout: NodeJS.Timeout | undefined;

  return (...args: unknown[]): ReturnType<T> | void => {
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = undefined;
      if (!immediate) {
        return fn(...args);
      }
    }, ms);
    if (callNow) {
      return fn(...args);
    }
  };
};
