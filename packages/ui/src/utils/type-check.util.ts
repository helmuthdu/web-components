export const isArray = Array.isArray;
export const isBoolean = (arg: unknown) => typeof arg === 'boolean';
export const isFunction = (arg: unknown) => typeof arg === 'function';
export const isNil = (arg: unknown) => arg === undefined || arg === null;
export const isNumber = (arg: unknown) => typeof arg === 'number';
export const isObject = (arg: unknown): arg is object => typeof arg === 'object' && arg !== null;
export const isString = (arg: unknown) => typeof arg === 'string';

const svgTags = new Set([
  'circle',
  'defs',
  'ellipse',
  'foreignobject',
  'g',
  'image',
  'line',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'svg',
  'symbol',
  'text',
  'tspan',
  'use',
]);

/**
 * Checks if a tag is an SVG element.
 * Optimized to avoid toLowerCase() when possible.
 */
export const isSVG = (tag: string): boolean => {
  if (svgTags.has(tag)) return true;

  const lc = tag.toLowerCase();

  return lc !== tag && svgTags.has(lc);
};
