type CreateElementProps<T extends keyof HTMLElementTagNameMap> =
  | Partial<HTMLElementTagNameMap[T]>
  | {
      $for?: any[];
      $if?: undefined | boolean | ((item: any, index: number) => boolean);
    }
  | ((item: any, index: number) => string | number | HTMLElementTagNameMap[T]);

const isString = (arg: unknown) => typeof arg === 'string';
const isObject = (arg: unknown) => typeof arg === 'object';
const isFunction = (arg: unknown) => typeof arg === 'function';
const isArray = Array.isArray;

class DraftElement {
  tag!: string;
  attributes: Record<string, any> = {};
  host: any;
  children: any[] = [];
  index: number = 0;
  constructor(host = undefined, index = 0) {
    this.host = host;
    this.index = index;
  }
}

const Operators = Object.freeze({
  $for: (value: unknown) => {
    const drafts = [];
    if (!value || !isArray(value)) {
      drafts.push(new DraftElement());
    } else {
      value.forEach((host, index) => drafts.push(new DraftElement(host, index)));
    }
    return drafts;
  },
  $if: (value: unknown, callbackFn: any) => {
    if (value === undefined) {
      return true;
    } else {
      return typeof value === 'function' ? value(callbackFn) : !!value;
    }
  }
});

const attachAttribute = (attr: string, value: any, element: HTMLElement) => {
  if (attr === 'style' || attr === 'dataset') {
    Object.entries(value).forEach(([key, val]: any) => ((element as any)[attr][key] = val));
  } else if (attr === 'className' || [isObject, isFunction, isArray].some(is => is(typeof value))) {
    (element as any)[attr] = value;
  } else if (attr === 'innerHTML') {
    if (isString(value)) element.innerHTML = value;
  } else {
    element.setAttribute(attr, value);
  }
};

const appendChild = (child: any, element: HTMLElement, draft: DraftElement) => {
  if (child !== undefined) {
    if (isArray(child)) {
      child.forEach(_child => appendChild(_child, element, draft));
    } else if (child instanceof HTMLElement) {
      element.append(child);
    } else if (isFunction(child)) {
      appendChild(draft.host ? child(draft.host, draft.index) : child(), element, draft.host);
    } else {
      element.append(document.createTextNode(child.toString()));
    }
  }
};

const create = (draftElement: DraftElement) => {
  const element = document.createElement(draftElement.tag);
  Object.entries(draftElement.attributes).forEach(([key, value]) => attachAttribute(key, value, element));
  draftElement.children.forEach(child => appendChild(child, element, draftElement));
  return element;
};

const extract = (...props: unknown[]) => {
  let attributes: any = {};
  let children: any = [];

  if (props?.length > 0) {
    if (isObject(props[0])) {
      attributes = props[0];
    }
    if (props.length > 1) {
      children = isObject(props[0]) ? props.slice(1) : props;
    } else if (!isObject(props[0])) {
      children = props;
    }
  }
  return { attributes, children };
};

const define =
  (tag: string) =>
  (...props: unknown[]) => {
    const {
      attributes: { $for, $if, ...attributes },
      children
    } = extract(...props);

    const elements = Operators.$for($for)
      .filter(draft => Operators.$if($if, draft.host))
      .map(draft => {
        draft.tag = tag;
        Object.assign(draft.attributes, attributes);
        if (children) {
          draft.children.push([...children]);
        }
        return create(draft);
      });

    return elements.length === 1 ? elements[0] : elements;
  };

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  ...tags: T[]
): Record<T, (...props: CreateElementProps<T>[]) => HTMLElementTagNameMap[T]> =>
  tags.reduce((acc, tag) => ({ ...acc, [tag]: define(tag) }), {} as any);
