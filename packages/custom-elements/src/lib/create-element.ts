import { isArray, isFunction, isObject, isString } from './shared';

type ElementType = 'html' | 'fragment';

type OperatorProps = {
  $for?: unknown[];
  $if?: undefined | boolean | ((item: any, index: number) => boolean);
};

type HTMLTags = keyof HTMLElementTagNameMap;

type MarkupElement<T extends HTMLTags> = (...props: (ElementProps<T> | Element[])[]) => HTMLElementTagNameMap[T];

type ElementProps<T extends HTMLTags> =
  | boolean
  | undefined
  | (Partial<HTMLElementTagNameMap[T]> & OperatorProps)
  | ((item: any, index: number) => any | HTMLElementTagNameMap[T]);

type FragmentProps =
  | boolean
  | undefined
  | (Partial<DocumentFragment> & OperatorProps)
  | ((item: any, index: number) => any | HTMLElement);

type DraftElement = {
  attributes?: Record<string, any>;
  children?: any[];
  element: any;
  index: number;
  tag?: string;
};

const Operators = Object.freeze({
  $for: (item: unknown = undefined): DraftElement[] =>
    isArray(item) ? item.map((element, index) => ({ element, index })) : [{ element: undefined, index: 0 }],
  $if: (item: unknown, callbackFn: (item: unknown, index: number) => boolean): boolean =>
    item === undefined ? true : typeof item === 'function' ? item(callbackFn) : !!item
});

const attachAttribute = (attr: string, value: any, element: HTMLElement | DocumentFragment) => {
  if (attr === 'style' || attr === 'dataset') {
    Object.entries(value).forEach(([key, val]: any) => ((element as any)[attr][key] = val));
  } else if (attr === 'className' || [isObject, isFunction, isArray].some(is => is(value))) {
    (element as any)[attr] = value;
  } else if (element instanceof HTMLElement) {
    if (attr === 'innerHTML') {
      if (isString(value)) element.innerHTML = value;
    } else {
      element.setAttribute(attr, value);
    }
  }
};

const appendChild = (child: any, element: HTMLElement | DocumentFragment, draft: DraftElement) => {
  if (child !== undefined) {
    if (isArray(child)) {
      child.forEach(_child => appendChild(_child, element, draft));
    } else if (isFunction(child)) {
      appendChild(draft.element ? child(draft.element, draft.index) : child(), element, draft);
    } else if (child instanceof HTMLElement || child instanceof SVGSVGElement) {
      element.append(child);
    } else {
      element.append(document.createTextNode(child.toString()));
    }
  }
};

const createElement = (draftElement: Required<DraftElement>, type: ElementType = 'html') => {
  const element = type === 'fragment' ? new DocumentFragment() : document.createElement(draftElement.tag as string);
  Object.entries(draftElement.attributes).forEach(([key, value]) => attachAttribute(key, value, element));
  draftElement.children.forEach(child => appendChild(child, element, draftElement));
  return element;
};

const extract = (...props: unknown[]) => {
  let attributes: any = {};
  let children: any = [];

  if (props?.length > 0) {
    const [item, ...rest] = props.filter(i => i !== undefined);
    if (isObject(item)) {
      attributes = item;
      children = rest.flat();
    } else {
      children = [item];
    }
  }

  return { attributes, children };
};

const define =
  (tag = '', type: ElementType = 'html') =>
  (...props: unknown[]) => {
    const {
      attributes: { $for, $if, ...attributes },
      children
    } = extract(...props);

    const elements = Operators.$for($for)
      .filter(draft => Operators.$if($if, draft.element))
      .map(draft => createElement({ ...draft, attributes, tag, children }, type));

    return elements.length === 1 ? elements[0] : elements;
  };

export const fragment = (...props: FragmentProps[]) => define('', 'fragment')(...props);

export const rawHtml = (string: string) => [...new DOMParser().parseFromString(string, 'text/html').body.children];

export const markup = ((): { [T in HTMLTags]: MarkupElement<T> } =>
  [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'menu',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'picture',
    'pre',
    'progress',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'slot',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'var',
    'video',
    'wbr'
  ].reduce((acc, tag) => ({ ...acc, [tag]: define(tag) }), {} as any))();
