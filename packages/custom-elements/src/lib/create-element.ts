import { isArray, isFunction, isObject, isString } from './shared';

type HTMLTags = keyof HTMLElementTagNameMap;

type ElementDom<T extends HTMLTags> = (...props: (ElementProps<T> | Element[])[]) => HTMLElementTagNameMap[T];

type ElementProps<T extends HTMLTags> = Partial<HTMLElementTagNameMap[T]>;

type FragmentProps = Partial<DocumentFragment>;

type ElementDraft = {
  attributes: Record<string, any>;
  children: any[];
  tag: string | any;
};

const attachAttribute = (attr: string, value: any, element: HTMLElement | DocumentFragment) => {
  if (attr === 'style' || attr === 'dataset') {
    Object.assign((element as any)[attr], value);
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

const appendChild = (child: any, element: HTMLElement | DocumentFragment) => {
  if (child !== undefined) {
    if (isArray(child)) {
      child.forEach(c => appendChild(c, element));
    } else if (child instanceof HTMLElement || child instanceof SVGSVGElement) {
      element.append(child);
    } else {
      element.append(document.createTextNode(child.toString()));
    }
  }
};

const createElement = (draft: ElementDraft) => {
  if (typeof draft.tag === 'function') return draft.tag(draft.attributes, draft.children);
  const element = draft.tag === 'fragment' ? new DocumentFragment() : document.createElement(draft.tag);
  Object.entries(draft.attributes).forEach(([key, value]) => attachAttribute(key, value, element));
  draft.children.forEach(child => appendChild(child, element));
  return element;
};

const define = (tag = 'fragment', attributes: Record<string, any>, ...children: any[]) =>
  createElement({ tag, attributes, children });

export const fragment = (props: FragmentProps[], ...children: any[]) => define('fragment', props, ...children);

export const dom = <T extends HTMLTags>(tag: T, props: ElementProps<T> = {}, ...children: any[]): ElementDom<T> =>
  define(tag, props, ...children) as any;

export const rawHtml = (string: string) => [...new DOMParser().parseFromString(string, 'text/html').body.children];
