import { isObject, isString } from './type-checking.util';

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

export const applyStyles = async (shadowRoot: ShadowRoot, styles: unknown[] = []) => {
  if ((styles ?? []).length > 0) {
    Promise.all(styles).then(sheets => {
      // @ts-ignore
      shadowRoot.adoptedStyleSheets = sheets.map((style: any) => {
        const _style = style.default ?? style;
        if (isString(_style)) {
          const sheet = new CSSStyleSheet(); // @ts-ignore
          return sheet.replace(_style);
        } else if (_style instanceof CSSStyleSheet) {
          return Promise.resolve(_style);
        }
        throw new Error(`invalid css in styles`);
      });
    });
  }
};
