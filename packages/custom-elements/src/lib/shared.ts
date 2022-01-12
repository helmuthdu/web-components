export const isString = (arg: unknown) => typeof arg === 'string';
export const isObject = (arg: unknown) => typeof arg === 'object' && arg !== null;
export const isFunction = (arg: unknown) => typeof arg === 'function';
export const isArray = Array.isArray;
export const getAttrName = (prop: string) => prop.replace(/([A-Z])/g, '-$1').toLowerCase();
