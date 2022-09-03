import { isArray, isBoolean, isFunction, isNil, isObject, isSVG } from './utils';

export type Markup = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;

type HtmlOrSvg<Tag extends Markup> = Tag extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[Tag]
  : Tag extends keyof SVGElementTagNameMap
  ? SVGElementTagNameMap[Tag]
  : unknown;

export type ElementProps<T extends Markup> = Partial<Omit<HtmlOrSvg<T>, 'part'>> & { part?: string };

type ElementDraft = {
  props: Record<string, any>;
  children: any[];
  tag: string | any;
};

export type ElementDom<T extends Markup> = (...props: (HtmlOrSvg<T> | Element[])[]) => HtmlOrSvg<T>;

const attachAttribute = (attr: string, value: any, element: HTMLElement | SVGElement | DocumentFragment) => {
  if (element instanceof DocumentFragment) return;
  if (attr === 'className') {
    element.setAttribute('class', value);
  } else if (isFunction(value)) {
    if (/^(on[a-z]+)$/i.test(attr.toLowerCase())) {
      (element as any)[attr.toLowerCase()] = value;
    }
  } else if (isObject(value)) {
    if ((element as any)[attr]) {
      Object.assign((element as any)[attr], value);
    }
  } else {
    element.setAttribute(attr, value);
  }
};

const appendChild = (child: any, element: HTMLElement | SVGElement | DocumentFragment) => {
  if (!isNil(child)) {
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

const composeElement = (draft: ElementDraft) => {
  if (isFunction(draft.tag)) return draft.tag(draft.props, draft.children);
  const element = draft.tag === 'fragment' ? new DocumentFragment() : createElement(draft.tag);
  Object.entries(draft.props ?? {}).forEach(([key, value]) => attachAttribute(key, value, element));
  draft.children.forEach(child => appendChild(child, element));
  return element;
};

export const fragment = (...children: any[]) => composeElement({ tag: 'fragment', props: {}, children });

export const dom = <T extends Markup>(tag: T, props: ElementProps<T> = {}, ...children: any[]): ElementDom<T> =>
  composeElement({ tag, props, children });

export const raw = (string: string) => [...new DOMParser().parseFromString(string, 'text/html').body.children];

// @ts-ignore
window.rawHTML = raw;
