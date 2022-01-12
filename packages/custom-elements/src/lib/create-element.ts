const isString = (arg: unknown) => typeof arg === 'string';
const isObject = (arg: unknown) => typeof arg === 'object';
const isFunction = (arg: unknown) => typeof arg === 'function';
const isArray = Array.isArray;

class Blueprint {
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

const AttributeHandler = Object.freeze({
  $for: (attributeValue: unknown) => {
    const blueprints = [];
    if (!attributeValue || !Array.isArray(attributeValue)) {
      blueprints.push(new Blueprint());
    } else {
      attributeValue.forEach((host, index) => blueprints.push(new Blueprint(host, index)));
    }
    return blueprints;
  },
  $if: (attributeValue: unknown, callbackInput: any) => {
    if (attributeValue === undefined) {
      return true;
    } else {
      return typeof attributeValue === 'function' ? attributeValue(callbackInput) : !!attributeValue;
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

const appendChild = (child: any, element: HTMLElement, blueprint: Blueprint) => {
  if (child !== undefined) {
    const container: HTMLElement = element;
    if (Array.isArray(child)) {
      child.forEach(_child => appendChild(_child, container, blueprint));
    } else if (child instanceof HTMLElement) {
      container.append(child);
    } else if (isFunction(child)) {
      appendChild(blueprint.host ? child(blueprint.host, blueprint.index) : child(), container, blueprint.host);
    } else {
      container.append(document.createTextNode(child.toString()));
    }
  }
};

const create = (blueprint: Blueprint) => {
  const element = document.createElement(blueprint.tag);
  Object.entries(blueprint.attributes).forEach(([key, value]) => attachAttribute(key, value, element));
  blueprint.children.forEach(child => appendChild(child, element, blueprint));
  return element;
};

const extract = (...parts: unknown[]) => {
  let attributes: any = {};
  let children: any = [];

  if (parts?.length > 0) {
    if (parts.length > 1) {
      if (isObject(parts[0])) {
        attributes = parts[0];
        children = parts.slice(1);
      } else {
        children = parts;
      }
    } else {
      if (!isObject(parts[0])) {
        children = parts;
      } else {
        attributes = parts[0];
      }
    }
  }
  return { attributes, children };
};

const define =
  (tag: string) =>
  (...parts: unknown[]) => {
    const {
      attributes: { $for, $if, ...attributes },
      children
    } = extract(...parts);

    const elements = AttributeHandler.$for($for)
      .filter(blueprint => AttributeHandler.$if($if, blueprint.host))
      .map(blueprint => {
        blueprint.tag = tag;
        Object.assign(blueprint.attributes, attributes);
        if (children) {
          blueprint.children.push([...children]);
        }
        return create(blueprint);
      });

    return elements.length === 1 ? elements[0] : elements;
  };

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  ...tags: T[]
): Record<T, (...parts: Partial<HTMLElementTagNameMap[T]>[]) => HTMLElementTagNameMap[T]> =>
  tags.reduce((acc, tag) => ({ ...acc, [tag]: define(tag) }), {} as any);
