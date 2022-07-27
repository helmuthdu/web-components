import { isObject, isString } from './shared';

export const classMap = (...classes: unknown[]) =>
  classes
    .reduce((acc: string, arg: unknown) => {
      if (isString(arg)) {
        acc += `${arg} `;
      } else if (isObject(arg)) {
        Object.entries(arg as object)
          .filter(([_, valid]) => valid)
          .forEach(([key]) => {
            acc += `${key} `;
          });
      }
      return acc;
    }, '')
    .trim();

export const applyStyles = (shadowRoot: ShadowRoot, styles: unknown[] = []) => {
  if ((styles ?? []).length > 0) {
    Promise.all(
      styles.map(style => {
        if (isString(style)) {
          const sheet = new CSSStyleSheet(); // @ts-ignore
          return sheet.replace(style);
        } else if (style instanceof CSSStyleSheet) {
          return Promise.resolve(style);
        }
        throw new Error(`invalid css in styles`);
      })
    ).then((sheets: CSSStyleSheet[]) => {
      // @ts-ignore
      shadowRoot.adoptedStyleSheets = sheets;
    });
  }
};
