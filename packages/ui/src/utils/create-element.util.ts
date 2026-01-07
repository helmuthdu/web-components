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

  const target = element as any;

  if (attr === 'className' || attr === 'class') {
    element.setAttribute('class', isArray(value) ? value.join(' ') : String(value));
  } else if (isFunction(value) && /^on[a-z]+/i.test(attr)) {
    target[attr.toLowerCase()] = value;
  } else if (isBoolean(value)) {
    if (value) element.setAttribute(attr, '');
    else element.removeAttribute(attr);
  } else if (isObject(value) && target[attr]) {
    Object.assign(target[attr], value);
  } else if (!isNil(value)) {
    element.setAttribute(attr, String(value));
  }
};

const appendChild = (child: any, element: HTMLElement | SVGElement | DocumentFragment) => {
  if (!isNil(child)) {
    if (isArray(child)) {
      const fragment = document.createDocumentFragment();

      child.forEach((c) => appendChild(c, fragment));
      element.append(fragment);
    } else if (isObject(child)) {
      element.append(child as Node);
    } else if (!isBoolean(child)) {
      element.append(document.createTextNode(String(child)));
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

const templateElement = typeof document !== 'undefined' ? document.createElement('template') : null;

export const raw = (string: string) => {
  if (!templateElement) return [] as unknown as NodeListOf<ChildNode>;

  templateElement.innerHTML = string;

  // Remove script elements for security
  if (string.includes('<script')) {
    templateElement.content.querySelectorAll('script').forEach((script) => script.remove());
  }

  return templateElement.content.childNodes;
};

declare global {
  interface Window {
    parseHTML: (value: string) => NodeListOf<ChildNode>;
  }
}

if (typeof window !== 'undefined') {
  window.parseHTML = raw;
}
