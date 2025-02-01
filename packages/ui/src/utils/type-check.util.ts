export const isArray = Array.isArray;
export const isBoolean = (arg: unknown) => typeof arg === 'boolean';
export const isFunction = (arg: unknown) => typeof arg === 'function';
export const isNil = (arg: unknown) => arg === undefined || arg === null;
export const isNumber = (arg: unknown) => typeof arg === 'number';
export const isObject = (arg: unknown) => typeof arg === 'object' && arg !== null;
export const isString = (arg: unknown) => typeof arg === 'string';
export const isSVG = (tag: string) => {
  const regex = new RegExp(`^${tag}$`, 'i');

  return ['path', 'circle', 'rect', 'svg', 'use', 'g'].some((tag) => regex.test(tag));
};
