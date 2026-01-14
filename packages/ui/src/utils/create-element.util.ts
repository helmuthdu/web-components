import { classMap } from './styling-element.util';
import { isArray, isBoolean, isFunction, isNil, isObject, isSVG } from './type-check.util';

/**
 * Valid markup tags including standard HTML, SVG tags, and a special 'fragment' tag.
 */
export type Markup = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | 'fragment';

/**
 * Valid child types for an element.
 */
export type Child = Node | string | number | boolean | null | undefined | Child[];

/**
 * Properties for a given markup tag, excluding 'part' which is handled specially.
 */
export type ElementProps<T extends Markup> = Partial<
  Omit<ElementType<T>, 'part' | 'dataset' | 'className' | 'style'>
> & {
  [key: string]: any;
  class?: any;
  dataset?: Record<string, any>;
  part?: string;
  style?: Partial<CSSStyleDeclaration>;
};

/**
 * Resulting DOM type for a given markup tag.
 */
export type ElementDom<T extends Markup> = ElementType<T>;

type ElementType<Tag extends Markup> = Tag extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[Tag]
  : Tag extends keyof SVGElementTagNameMap
    ? SVGElementTagNameMap[Tag]
    : DocumentFragment;

type ElementTag<T extends Markup> = T | ((props: ElementProps<T>, children: Child[]) => ElementType<T>);

type ElementDraft<T extends Markup> = {
  children: Child[];
  props: ElementProps<T>;
  tag: ElementTag<T>;
};

/**
 * Attaches an attribute or property to an element.
 * Handles classes (via classMap), events, booleans, and objects (style, dataset).
 */
const attachAttribute = (el: HTMLElement | SVGElement, name: string, value: any): void => {
  // Class handling with automatic classMap support for better DX
  if (name === 'class') {
    el.setAttribute('class', classMap(value));

    return;
  }

  // Event handlers (onclick, onmouseover, etc.)
  if (isFunction(value) && name.startsWith('on')) {
    (el as any)[name.toLowerCase()] = value;

    return;
  }

  // Boolean attributes (disabled, checked, etc.)
  if (isBoolean(value)) {
    if (value) el.setAttribute(name, '');
    else el.removeAttribute(name);

    return;
  }

  // Object-based properties (style, dataset)
  if (isObject(value) && (name === 'style' || name === 'dataset')) {
    Object.assign((el as any)[name], value);

    return;
  }

  // Default attribute setting
  if (!isNil(value)) {
    el.setAttribute(name, String(value));
  }
};

/**
 * Appends children to an element or fragment.
 * Supports nested arrays, Nodes, and primitives.
 */
const appendChildren = (el: HTMLElement | SVGElement | DocumentFragment, children: Child[]): void => {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (isNil(child) || isBoolean(child)) continue;

    if (isArray(child)) {
      appendChildren(el, child);
    } else {
      el.append(child as any);
    }
  }
};

/**
 * Creates an element based on the tag name, handling SVG namespaces.
 */
const createElementUtil = (tag: Markup): HTMLElement | SVGElement =>
  isSVG(tag) ? document.createElementNS('http://www.w3.org/2000/svg', tag) : document.createElement(tag);

/**
 * Composes an element from a draft object.
 */
const composeElement = <T extends Markup>(draft: ElementDraft<T>): ElementDom<T> => {
  const { children, props, tag } = draft;

  if (isFunction(tag)) {
    return tag(props, children) as any;
  }

  const isFrag = tag === 'fragment';
  const el = isFrag ? document.createDocumentFragment() : createElementUtil(tag);

  if (!isFrag && props) {
    for (const key in props) {
      attachAttribute(el as HTMLElement | SVGElement, key, (props as any)[key]);
    }
  }

  appendChildren(el, children);

  return el as ElementDom<T>;
};

/**
 * Creates a DocumentFragment containing the provided children.
 */
export const fragment = (...children: Child[]): DocumentFragment =>
  composeElement({ children, props: {}, tag: 'fragment' }) as DocumentFragment;

/**
 * Main utility to create DOM elements or functional components.
 * Similar to React.createElement or h().
 */
export const dom = <T extends Markup>(tag: T, props: ElementProps<T> = {}, ...children: Child[]): ElementDom<T> =>
  composeElement<T>({ children, props, tag });

const templateElement = typeof document !== 'undefined' ? document.createElement('template') : null;

/**
 * Parses an HTML string into a NodeList.
 * Automatically removes script tags for basic security.
 */
export const raw = (string: string): NodeListOf<ChildNode> => {
  if (!templateElement) return [] as unknown as NodeListOf<ChildNode>;

  templateElement.innerHTML = string;

  // Remove script elements for security
  if (string.toLowerCase().includes('<script')) {
    const scripts = templateElement.content.querySelectorAll('script');

    for (let i = 0; i < scripts.length; i++) {
      scripts[i].remove();
    }
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
