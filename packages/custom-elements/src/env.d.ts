/// <reference types="vite/client" />
import { DOMAttributes } from 'react';

type CustomEvents<K extends string> = { [key in K]: (event: CustomEvent) => void };
type CustomElement<T, K extends string> = Partial<T & DOMAttributes<T> & { children: any } & CustomEvents<`on${K}`>>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['ui-accordion']: CustomElement<any>;
      ['ui-accordion-group']: CustomElement<any>;
      ['ui-alert']: CustomElement<any>;
      ['ui-avatar']: CustomElement<any>;
      ['ui-avatar-group']: CustomElement<any>;
      ['ui-badge']: CustomElement<any>;
      ['ui-box']: CustomElement<any>;
      ['ui-button']: CustomElement<any>;
      ['ui-button-group']: CustomElement<any>;
      ['ui-card']: CustomElement<any>;
      ['ui-card-body']: CustomElement<any>;
      ['ui-card-footer']: CustomElement<any>;
      ['ui-card-header']: CustomElement<any>;
      ['ui-card-image']: CustomElement<any>;
      ['ui-card-meta']: CustomElement<any>;
      ['ui-carousel']: CustomElement<any>;
      ['ui-carousel-item']: CustomElement<any>;
      ['ui-close-button']: CustomElement<any>;
      ['ui-toast']: CustomElement<any>;
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
