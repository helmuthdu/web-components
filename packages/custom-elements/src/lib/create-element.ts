import { isArray, isBoolean, isFunction, isObject, isSVG } from './shared';

type Markup = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;

type HtmlOrSvg<Tag extends Markup> = Tag extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[Tag]
  : Tag extends keyof SVGElementTagNameMap
  ? SVGElementTagNameMap[Tag]
  : unknown;

type ElementDom<T extends Markup> = (...props: (HtmlOrSvg<T> | Element[])[]) => HtmlOrSvg<T>;

type ElementProps<T extends Markup> = Partial<HtmlOrSvg<T>>;

type ElementDraft = {
  attributes: Record<string, any>;
  children: any[];
  tag: string | any;
};

const attachAttribute = (attr: string, value: any, element: HTMLElement | SVGElement | DocumentFragment) => {
  if (element instanceof DocumentFragment) return;

  if (attr === 'innerHTML' || attr === 'dangerouslySetInnerHTML') {
    element.innerHTML = value.__html ?? value;
  } else if (isFunction(value)) {
    const event = attr.toLowerCase();
    const regexp = /^(on[a-z]+)$/i;
    if (regexp.test(event)) {
      (element as any)[event] = value;
    }
  } else if (isObject(value)) {
    Object.assign((element as any)[attr], value);
  } else if (attr === 'className') {
    element.setAttribute('class', value);
  } else {
    element.setAttribute(attr, value);
  }
};

const appendChild = (child: any, element: HTMLElement | SVGElement | DocumentFragment) => {
  if ([undefined, null].every(t => child !== t)) {
    if (isArray(child)) {
      child.forEach(c => appendChild(c, element));
    } else if (isObject(child)) {
      element.append(child);
    } else if (!isBoolean(child)) {
      element.append(document.createTextNode(child.toString()));
    }
  }
};

const createElement = (tag: string) =>
  isSVG(tag) ? document.createElementNS('http://www.w3.org/2000/svg', tag) : document.createElement(tag);

const create = (draft: ElementDraft) => {
  if (isFunction(draft.tag)) return draft.tag(draft.attributes, draft.children);
  const element = draft.tag === 'fragment' ? new DocumentFragment() : createElement(draft.tag);
  Object.entries(draft.attributes ?? {}).forEach(([key, value]) => attachAttribute(key, value, element));
  draft.children.forEach(child => appendChild(child, element));
  return element;
};

const define = (tag: string, attributes: Record<string, any>, ...children: any[]) =>
  create({ tag, attributes, children });

export const fragment = (...children: any[]) => define('fragment', {}, ...children);

export const dom = <T extends Markup>(tag: T, props: ElementProps<T> = {}, ...children: any[]): ElementDom<T> =>
  define(tag, props, ...children) as any;

export const rawHTML = (string: string) => [...new DOMParser().parseFromString(string, 'text/html').body.children];

// @ts-ignore
window.rawHTML = rawHTML;
