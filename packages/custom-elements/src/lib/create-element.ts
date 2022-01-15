import { isArray, isFunction, isObject, isString } from './shared';

type ElementType = 'html' | 'fragment';

type OperatorProps = {
  $for?: unknown[];
  $if?: undefined | boolean | ((item: any, index: number) => boolean);
};

type HTMLTags = keyof HTMLElementTagNameMap;

type MarkupElement<T extends HTMLTags> = (...props: ElementProps<T>[]) => HTMLElementTagNameMap[T];

type ElementProps<T extends HTMLTags> =
  | boolean
  | undefined
  | (Partial<HTMLElementTagNameMap[T]> & OperatorProps)
  | ((item: any, index: number) => any | HTMLElementTagNameMap[T]);

type FragmentProps =
  | boolean
  | undefined
  | (Partial<DocumentFragment> & OperatorProps)
  | ((item: any, index?: number) => any | HTMLElement);

class DraftElement {
  attributes: Record<string, any> = {};
  children: any[] = [];
  element: any;
  index = 0;
  tag!: string;
  constructor(element = undefined, index = 0) {
    this.element = element;
    this.index = index;
  }
}

const Operators = Object.freeze({
  $for: (value: unknown) => {
    const drafts = [];
    if (!value || !isArray(value)) {
      drafts.push(new DraftElement());
    } else {
      value.forEach((element, index) => drafts.push(new DraftElement(element, index)));
    }
    return drafts;
  },
  $if: (value: unknown, callbackFn: any) => {
    return value === undefined ? true : typeof value === 'function' ? value(callbackFn) : !!value;
  }
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
    } else if (child instanceof HTMLElement || child instanceof SVGSVGElement) {
      element.append(child);
    } else if (isFunction(child)) {
      appendChild(draft.element ? child(draft.element, draft.index) : child(), element, draft);
    } else {
      element.append(document.createTextNode(child.toString()));
    }
  }
};

const createElement = (draftElement: DraftElement, type: ElementType = 'html') => {
  const element = type === 'fragment' ? new DocumentFragment() : document.createElement(draftElement.tag);
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
      children = rest;
    } else {
      children = item;
    }
  }

  return { attributes, children };
};

const define =
  (tag?: string, type: ElementType = 'html') =>
  (...props: unknown[]) => {
    const {
      attributes: { $for, $if, ...attributes },
      children
    } = extract(...props);

    const elements = Operators.$for($for)
      .filter(draft => Operators.$if($if, draft.element))
      .map(draft => {
        Object.assign(draft, { attributes, tag, children: children ? [...children] : [] });
        return createElement(draft, type);
      });

    return elements.length === 1 ? elements[0] : elements;
  };

export const fragment = (...props: FragmentProps[]) => define(undefined, 'fragment')(...props);

export const raw = (string: string) => new DOMParser().parseFromString(string, 'text/html').body.children[0];

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
