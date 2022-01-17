export const isString = (arg: unknown) => typeof arg === 'string';
export const isObject = (arg: unknown) => typeof arg === 'object' && arg !== null;
export const isFunction = (arg: unknown) => typeof arg === 'function';
export const isArray = Array.isArray;
export const isSVG = (tag: string) => {
  const regex = new RegExp(`^${tag}$`, 'i');
  return ['path', 'svg', 'use', 'g'].some(tag => regex.test(tag));
};
export const getAttrName = (prop: string) => prop.replace(/([A-Z])/g, '-$1').toLowerCase();
export const normalizeValue = (key: string | symbol, value: any) => {
  return key === 'dataset'
    ? Object.entries(value).reduce((acc, [k, v]) => ({ ...acc, [k]: v === '' ? true : v }), {} as typeof value)
    : value === ''
    ? true
    : value;
};
