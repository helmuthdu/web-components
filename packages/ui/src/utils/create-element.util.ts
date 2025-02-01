import { isArray, isBoolean, isFunction, isNil, isObject, isSVG } from './type-check.util';

export type Markup = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | 'fragment';

export type ElementProps<T extends Markup> = Partial<Omit<ElementType<T>, 'part'>> & { part?: string };

export type ElementDom<T extends Markup> = ElementType<T> | HTMLElement | SVGElement | DocumentFragment;

type ElementType<Tag extends Markup> = Tag extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[Tag]
  : Tag extends keyof SVGElementTagNameMap
    ? SVGElementTagNameMap[Tag]
    : DocumentFragment;

type ElementTag<T extends Markup> = T | ((props: ElementProps<T>, children: any[]) => ElementType<T>);

type ElementDraft<T extends Markup> = {
  children: any[];
  props: ElementProps<T>;
  tag: ElementTag<T>;
};

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
      child.forEach((c) => appendChild(c, element));
    } else if (isObject(child)) {
      element.append(child as Node);
    } else if (!isBoolean(child)) {
      element.append(document.createTextNode(child.toString()));
    }
  }
};

const createElementUtil = (tag: Markup) =>
  isSVG(tag) ? document.createElementNS('http://www.w3.org/2000/svg', tag) : document.createElement(tag);

const composeElement = <T extends Markup>(draft: ElementDraft<T>) => {
  if (isFunction(draft.tag)) return draft.tag(draft.props, draft.children);

  const element = draft.tag === 'fragment' ? new DocumentFragment() : createElementUtil(draft.tag);

  Object.entries(draft.props ?? {}).forEach(([key, value]) => attachAttribute(key, value, element));
  draft.children.forEach((child) => appendChild(child, element));

  return element;
};

export const fragment = (...children: any[]) => composeElement({ children, props: {}, tag: 'fragment' });

export const dom = <T extends Markup>(tag: T, props: ElementProps<T> = {}, ...children: any[]): ElementDom<T> =>
  composeElement<T>({ children, props, tag });

export const raw = (string: string) => new DOMParser().parseFromString(string, 'text/html').body.childNodes;

declare global {
  interface Window {
    parseHTML: (value: string) => NodeListOf<ChildNode>;
  }
}

window.parseHTML = raw;
