import { isArray, isBoolean, isFunction, isNil, isObject, isSVG } from './shared';

type Markup = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;

type HtmlOrSvg<Tag extends Markup> = Tag extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[Tag]
  : Tag extends keyof SVGElementTagNameMap
  ? SVGElementTagNameMap[Tag]
  : unknown;

type ElementDom<T extends Markup> = (...props: (HtmlOrSvg<T> | Element[])[]) => HtmlOrSvg<T>;

type ElementProps<T extends Markup> = Partial<HtmlOrSvg<T>>;

type ElementDraft = {
  props: Record<string, any>;
  children: any[];
  tag: string | any;
};

const attachAttribute = (attr: string, value: any, element: HTMLElement | SVGElement | DocumentFragment) => {
  if (element instanceof DocumentFragment) return;
  if (attr === 'innerHTML' || attr === 'dangerouslySetInnerHTML') {
    element.innerHTML = value.__html ?? value;
  } else if (isFunction(value)) {
    if (/^(on[a-z]+)$/i.test(attr.toLowerCase())) {
      (element as any)[attr.toLowerCase()] = value;
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

const define = (draft: ElementDraft) => {
  if (isFunction(draft.tag)) return draft.tag(draft.props, draft.children);
  const element = draft.tag === 'fragment' ? new DocumentFragment() : createElement(draft.tag);
  Object.entries(draft.props ?? {}).forEach(([key, value]) => attachAttribute(key, value, element));
  draft.children.forEach(child => appendChild(child, element));
  return element;
};

export const fragment = (...children: any[]) => define({ tag: 'fragment', props: {}, children });

export const dom = <T extends Markup>(tag: T, props: ElementProps<T> = {}, ...children: any[]): ElementDom<T> =>
  define({ tag, props, children });

export const rawHTML = (string: string) => [...new DOMParser().parseFromString(string, 'text/html').body.children];

// @ts-ignore
window.rawHTML = rawHTML;
