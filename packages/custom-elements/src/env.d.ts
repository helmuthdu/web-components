/// <reference types="vite/client" />
import { DOMAttributes } from 'react';

type CustomEvents<K extends string> = { [key in K] : (event: CustomEvent) => void };
type CustomElement<T, K extends string> = Partial<T & DOMAttributes<T> & { children: any } & CustomEvents<`on${K}`>>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['ui-accordion']: CustomElement<Element>;
      ['ui-accordion-group']: CustomElement<Element>;
      ['ui-alert']: CustomElement<Element>;
      ['ui-avatar']: CustomElement<Element>;
      ['ui-avatar-group']: CustomElement<Element>;
      ['ui-badge']: CustomElement<Element>;
      ['ui-card']: CustomElement<Element>;
      ['ui-card-body']: CustomElement<Element>;
      ['ui-card-footer']: CustomElement<Element>;
      ['ui-card-header']: CustomElement<Element>;
      ['ui-card-image']: CustomElement<Element>;
      ['ui-card-meta']: CustomElement<Element>;
      ['ui-carousel']: CustomElement<Element>;
      ['ui-carousel-item']: CustomElement<Element>;
      ['ui-toast']: CustomElement<Element>;
      ['ui-box']: CustomElement<Element>;
      ['ui-button']: CustomElement<Element>;
      ['ui-button-group']: CustomElement<Element>;
    }
  }
  interface ShadowRoot {
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

type Primitive = string | boolean | number;

type ValueOf<T> = T[keyof T];

type Nullable<T> = T | null;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : DeepPartial<T[P]>;
};

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
