import { raw } from './create-element.util';
import { configureFormElement } from './form-element.util';
import { classMap, loadCSSStyleSheets } from './styling-element.util';
import { isFunction, isObject, isString } from './type-check.util';

type HTMLTags = keyof HTMLElementEventMap;

/**
 * Lifecycle hook types for better type safety and autocomplete
 */
type LifecycleHook<T extends HTMLElement, P extends object = object, S extends object = object> = (
  el: WebComponent<T, P, S>,
) => void;

type AttributeChangeHook<T extends HTMLElement, P extends object = object, S extends object = object> = (
  name: string,
  prev: string | null,
  curr: string | null,
  el: WebComponent<T, P, S>,
) => void;

/**
 * Template function or string - in practice always a function
 */
type Template<T extends HTMLElement, P extends object = object, S extends object = object> =
  | ((el: WebComponent<T, P, S>) => string | Node | NodeList | HTMLCollection)
  | string;

/**
 * Enhanced component options with better DX and automatic optimizations
 */
export type WebComponentOptions<
  T extends HTMLElement = HTMLElement,
  P extends object = object,
  S extends object = object,
> = {
  /** Enable form association (makes element work with forms) */
  form?: boolean;

  /** Attributes to observe (triggers onAttributeChanged and reflects as properties) */
  observedAttributes?: readonly string[];

  /** Called when an observed attribute changes */
  onAttributeChanged?: AttributeChangeHook<T, P, S>;

  /** Called when an element is added to DOM */
  onConnected?: LifecycleHook<T, P, S>;

  /** Called when an element is removed from DOM */
  onDisconnected?: LifecycleHook<T, P, S>;

  /** Called after every render */
  onUpdated?: LifecycleHook<T, P, S>;

  /** Initial state - triggers re-render on changes */
  state?: S;

  /** CSS styles to apply to shadow DOM */
  styles?: (CSSStyleSheet | string)[];

  /** Template generator - returns HTML string or Node */
  template: Template<T, P, S>;
};

export type WebComponentElement<T extends HTMLElement = HTMLElement, S extends object = object> = {
  /** Clear a scheduled setTimeout */
  clearTimeout: (id: number) => void;

  /** Attach an event listener with automatic cleanup */
  event: (
    id: string | HTMLElement | T,
    event: string | HTMLTags,
    callback: EventListener,
    options?: AddEventListenerOptions,
  ) => void;

  /** Dispatch a custom event */
  fire: (event: string | HTMLTags, options?: CustomEventInit) => void;

  /** Get element by ID from shadow DOM */
  ref: <U extends HTMLElement = HTMLElement>(id: string) => U | null;

  /** Trigger a re-render */
  render: () => void;

  /** The first element in the shadow DOM */
  readonly rootElement: T;

  /** Schedule a callback after a delay with automatic cleanup */
  setTimeout: (callback: () => void, ms: number) => number;

  /** Reactive state object */
  readonly state: S;

  /** Form element value (if form: true) */
  value?: string;
};

export type WebComponent<
  T extends HTMLElement = HTMLElement,
  P extends object = object,
  S extends object = object,
> = P & WebComponentElement<T, S> & Omit<T, keyof P | keyof WebComponentElement<T, S>>;

/**
 * Helper to convert kebab-case to camelCase.
 */
const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

/**
 * Helper to convert camelCase or PascalCase to kebab-case.
 */
const toKebabCase = (str: string) => {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`).replace(/^-/, '');
};

/**
 * Helper to convert various template results to a Node array.
 */
const toNodeArray = (result: any): Node[] => {
  if (isString(result)) return Array.from(raw(result));

  if (result instanceof NodeList || result instanceof HTMLCollection) return Array.from(result);

  if (result instanceof Node) {
    return result instanceof DocumentFragment ? Array.from(result.childNodes) : [result];
  }

  return [];
};

/**
 * Base class for all web components in the library.
 * Provides common functionality like shadow DOM attachment,
 * styles loading, rendering with reconciliation, and event handling.
 */
export abstract class BaseWebComponent<
  T extends HTMLElement = HTMLElement,
  P extends object = object,
  S extends object = object,
>
  extends HTMLElement
  implements WebComponentElement<T, S>
{
  public readonly state: S;
  protected readonly shadow = this.attachShadow({ mode: 'open' });
  private controller = new AbortController();
  private readonly timeouts = new Set<number>();
  private observer: MutationObserver | null = null;
  private _renderQueued = false;

  /**
   * Returns the first element in the shadow DOM.
   */
  get rootElement(): T {
    return this.shadow.firstElementChild as T;
  }

  /**
   * Helper to cast the instance to WebComponent<T,  P,S>.
   */
  get self() {
    return this as unknown as WebComponent<T, P, S>;
  }

  constructor(protected readonly options: WebComponentOptions<T, P, S>) {
    super();

    this.state = this._initState(options.state);
    this._initAttributes(options.observedAttributes);

    if (options.form) {
      configureFormElement(this as unknown as HTMLInputElement);
    }

    this._initializeStyles();
    this.render();
  }

  /**
   * Initializes state with a recursive reactive proxy.
   */
  private _initState(initialState?: S): S {
    const render = () => this.render();
    const proxyMap = new WeakMap<object, any>();

    const createProxy = (obj: any): any => {
      if (!isObject(obj) || obj instanceof Node) {
        return obj;
      }

      if (proxyMap.has(obj)) {
        return proxyMap.get(obj);
      }

      const proxy = new Proxy(obj, {
        get(target, prop) {
          const value = Reflect.get(target, prop);

          return createProxy(value);
        },
        set(target, prop, value) {
          if (Reflect.get(target, prop) === value) return true;

          const result = Reflect.set(target, prop, value);

          // Only trigger re-render if the property name does not start with "_"
          // This allows storing internal/non-reactive data in the state
          if (typeof prop !== 'string' || !prop.startsWith('_')) {
            render();
          }

          return result;
        },
      });

      proxyMap.set(obj, proxy);

      return proxy;
    };

    return createProxy(initialState ? { ...initialState } : ({} as S));
  }

  /**
   * Maps observed attributes to camelCase properties on the element.
   */
  private _initAttributes(attributes?: readonly string[]): void {
    if (!attributes) return;

    attributes.forEach((attr) => {
      const prop = toCamelCase(attr);

      if (!(prop in this)) {
        Object.defineProperty(this, prop, {
          configurable: true,
          get: () => {
            const val = this.getAttribute(attr);

            return val === '' ? true : val;
          },
          set: (val: any) => {
            if (val === null || val === false) {
              this.removeAttribute(attr);
            } else {
              this.setAttribute(attr, val === true ? '' : String(val));
            }
          },
        });
      }
    });
  }

  /**
   * Observes child changes to trigger re-renders.
   */
  private _setupMutationObserver(): void {
    this.observer = new MutationObserver(() => this.render());
    this.observer.observe(this, { childList: true });
  }

  /**
   * Initializes and loads CSS stylesheets into the shadow DOM.
   */
  private _initializeStyles(): void {
    loadCSSStyleSheets(this.options.styles)
      .then((sheets) => {
        if (sheets?.length) {
          this.shadow.adoptedStyleSheets = sheets;
        }
      })
      .catch((error) => console.error('Failed to load stylesheets:', error));
  }

  connectedCallback() {
    if (this.controller.signal.aborted) {
      this.controller = new AbortController();
    }

    if (!this.observer) {
      this._setupMutationObserver();
    }

    // Perform initial render synchronously if not already done
    // to ensure refs are available in onConnected
    if (!this.shadow.hasChildNodes()) {
      this._performRender();
    }

    this.options.onConnected?.(this.self);
  }

  disconnectedCallback() {
    this.options.onDisconnected?.(this.self);
    this.controller.abort();
    this.timeouts.forEach((id) => window.clearTimeout(id));
    this.timeouts.clear();
    this.observer?.disconnect();
    this.observer = null;
  }

  attributeChangedCallback(name: string, prev: string | null, curr: string | null) {
    if (prev !== curr) {
      this.options.onAttributeChanged?.(name, prev, curr, this.self);
      this.render();
    }
  }

  /**
   * Schedules a render in the next animation frame.
   */
  render(): void {
    if (this._renderQueued) return;

    this._renderQueued = true;
    requestAnimationFrame(() => {
      this._renderQueued = false;
      this._performRender();
    });
  }

  /**
   * Performs the actual rendering and reconciliation.
   */
  private _performRender(): void {
    const { template } = this.options;
    const result = isFunction(template) ? template(this.self) : template;

    this._reconcile(this.shadow, toNodeArray(result));
    this.options.onUpdated?.(this.self);
  }

  /**
   * Reconciles children of a node with a new set of nodes.
   */
  private _reconcile(parent: Node | ShadowRoot, newNodes: Node[]): void {
    const currentNodes = Array.from(parent.childNodes);
    const maxLength = Math.max(currentNodes.length, newNodes.length);

    for (let i = 0; i < maxLength; i++) {
      const newNode = newNodes[i];
      const oldNode = currentNodes[i];

      if (!oldNode) {
        parent.appendChild(newNode);
      } else if (!newNode) {
        parent.removeChild(oldNode);
      } else if (
        oldNode.nodeType !== newNode.nodeType ||
        (oldNode instanceof Element && newNode instanceof Element && oldNode.tagName !== newNode.tagName)
      ) {
        parent.replaceChild(newNode, oldNode);
      } else if (oldNode instanceof Element && newNode instanceof Element) {
        this._updateElement(oldNode, newNode);
      } else if (oldNode instanceof Text && newNode instanceof Text) {
        if (oldNode.textContent !== newNode.textContent) {
          oldNode.textContent = newNode.textContent;
        }
      } else if (!oldNode.isEqualNode(newNode)) {
        parent.replaceChild(newNode, oldNode);
      }
    }
  }

  /**
   * Updates an existing element with properties from a new element.
   */
  private _updateElement(oldEl: Element, newEl: Element): void {
    // Update attributes
    const oldAttrs = oldEl.attributes;
    const newAttrs = newEl.attributes;

    // Remove old attributes that are not in a new element
    for (let i = oldAttrs.length - 1; i >= 0; i--) {
      const { name } = oldAttrs[i];

      if (!newEl.hasAttribute(name)) {
        oldEl.removeAttribute(name);
      }
    }

    // Add or update attributes from a new element
    for (let i = 0; i < newAttrs.length; i++) {
      const { name, value } = newAttrs[i];

      if (oldEl.getAttribute(name) !== value) {
        oldEl.setAttribute(name, value);
      }
    }

    // Preserve form element state
    if (
      oldEl instanceof HTMLInputElement ||
      oldEl instanceof HTMLTextAreaElement ||
      oldEl instanceof HTMLSelectElement
    ) {
      const oldFormEl = oldEl as any;
      const newFormEl = newEl as any;

      if (newEl.hasAttribute('value') && oldFormEl.value !== newFormEl.value) {
        oldFormEl.value = newFormEl.value;
      }

      if (oldEl instanceof HTMLInputElement && (oldEl.type === 'checkbox' || oldEl.type === 'radio')) {
        const isChecked = newEl.hasAttribute('checked');

        if (oldFormEl.checked !== isChecked) {
          oldFormEl.checked = isChecked;
        }
      }
    }

    // Reconcile children
    this._reconcile(oldEl, Array.from(newEl.childNodes));
  }

  fire(event: string | HTMLTags, options?: CustomEventInit): void {
    this.dispatchEvent(new CustomEvent(event, options));
  }

  event(
    id: string | HTMLElement | T,
    event: string | HTMLTags,
    callback: EventListener,
    options?: AddEventListenerOptions,
  ): void {
    if (isString(id)) {
      const kebabId = toKebabCase(id as string);

      this.shadow.addEventListener(
        event,
        (e) => {
          const path = e.composedPath();
          const element = path.find((node) => node instanceof Element && (node.id === id || node.id === kebabId)) as
            | HTMLElement
            | undefined;

          if (element) {
            callback.call(element, e);
          }
        },
        { ...options, signal: this.controller.signal },
      );
    } else {
      const element = id as HTMLElement;

      if (element) {
        element.addEventListener(event, callback, { ...options, signal: this.controller.signal });
      }
    }
  }

  /**
   * Schedule a setTimeout with automatic cleanup on disconnect.
   */
  setTimeout(callback: () => void, ms: number): number {
    const id = window.setTimeout(() => {
      this.timeouts.delete(id);
      callback();
    }, ms);

    this.timeouts.add(id);

    return id;
  }

  /**
   * Clear a scheduled setTimeout and remove it from the tracking set.
   */
  clearTimeout(id: number): void {
    window.clearTimeout(id);
    this.timeouts.delete(id);
  }

  ref<U extends HTMLElement = HTMLElement>(id: string): U | null {
    let el = this.shadow.getElementById(id);

    if (!el && id) {
      el = this.shadow.getElementById(toKebabCase(id));
    }

    return el as U | null;
  }
}

/**
 * Factory function to create a Web Component class.
 */
export const component = <T extends HTMLElement = HTMLElement, P extends object = object, S extends object = object>(
  options: WebComponentOptions<T, P, S>,
) => {
  const { observedAttributes = [] } = options;

  class WebComponentImpl extends BaseWebComponent<T, P, S> {
    static formAssociated = options.form;

    static get observedAttributes() {
      return observedAttributes;
    }

    constructor() {
      super(options);
    }
  }

  return WebComponentImpl as unknown as CustomElementConstructor;
};

/**
 * Defines a new custom element.
 */
export const define = <T extends HTMLElement = HTMLElement, P extends object = object, S extends object = object>(
  name: string,
  options: WebComponentOptions<T, P, S>,
): void => {
  if (!customElements.get(name)) {
    customElements.define(name, component<T, P, S>(options));
  }
};

export { classMap };
