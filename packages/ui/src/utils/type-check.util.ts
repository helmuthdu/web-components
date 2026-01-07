export const isArray = Array.isArray;
export const isBoolean = (arg: unknown) => typeof arg === 'boolean';
export const isFunction = (arg: unknown) => typeof arg === 'function';
export const isNil = (arg: unknown) => arg === undefined || arg === null;
export const isNumber = (arg: unknown) => typeof arg === 'number';
export const isObject = (arg: unknown) => typeof arg === 'object' && arg !== null;
export const isString = (arg: unknown) => typeof arg === 'string';

const svgTags = new Set([
  'circle',
  'defs',
  'ellipse',
  'foreignObject',
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

export const isSVG = (tag: string) => svgTags.has(tag.toLowerCase());
