import { isArray, isFunction, isObject, isString } from './shared';
import HTMLElementsReference from './elements-reference.json';

type ElementType = 'html' | 'fragment';

type OperatorProps = {
  $for?: unknown[];
  $if?: undefined | boolean | ((item: any, index: number) => boolean);
};

type HTMLTags = keyof HTMLElementTagNameMap;

type MarkupElement<T extends HTMLTags> = (...props: ElementProps<T>[]) => HTMLElementTagNameMap[T];

type ElementProps<T extends HTMLTags> =
  | (Partial<HTMLElementTagNameMap[T]> & OperatorProps)
  | ((item: unknown, index: number) => string | number | HTMLElementTagNameMap[T]);

type FragmentProps =
  | (Partial<DocumentFragment> & OperatorProps)
  | ((item: unknown, index: number) => string | number | HTMLElement);

class DraftElement {
  attributes: Record<string, any> = {};
  children: any[] = [];
  element: any;
  index: number = 0;
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

export const markup = ((): { [T in HTMLTags]: MarkupElement<T> } => {
  return HTMLElementsReference.reduce((acc, tag) => ({ ...acc, [tag]: define(tag) }), {} as any);
})();

export const fragment = (...props: FragmentProps[]) => define(undefined, 'fragment')(...props);

export const rawHtml = (str: string) => new DOMParser().parseFromString(str, 'text/html').body.children[0];
