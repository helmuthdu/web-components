/// <reference types="vite/client" />

type CustomEvents<K extends string> = { [key in K]: (event: CustomEvent) => void };
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type CustomElement<T, K extends string> = Partial<T & DOMAttributes<T> & { children: any } & CustomEvents<`on${K}`>>;

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    part?: string;
  }
}

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
      ['ui-carousel-image']: CustomElement<any>;
      ['ui-close-button']: CustomElement<any>;
      ['ui-toast']: CustomElement<any>;
    }
  }
  interface ShadowRoot {
    adoptedStyleSheets: CSSStyleSheet[];
  }
}
