import { classMap, loadCSSStyleSheets } from '../styling-element.util';

describe('classMap', () => {
  it('should handle strings', () => {
    expect(classMap('foo', 'bar')).toBe('foo bar');
    expect(classMap('foo bar')).toBe('foo bar');
  });

  it('should handle objects', () => {
    const mods = { bar: false, baz: true, foo: true };

    expect(classMap(mods)).toBe('baz foo');
  });

  it('should handle mixed arguments', () => {
    expect(classMap('base', { active: true, disabled: false }, 'extra')).toBe('base active extra');
  });

  it('should handle arrays', () => {
    expect(classMap(['foo', 'bar'], 'baz')).toBe('foo bar baz');
    expect(classMap(['foo', ['bar', 'baz']])).toBe('foo bar baz');
  });

  it('should handle nested structures', () => {
    expect(classMap('a', ['b', { c: true, d: false }], { e: true })).toBe('a b c e');
  });

  it('should filter out nil values', () => {
    expect(classMap('foo', null, undefined, false, '')).toBe('foo');
  });

  it('should handle multiple classes in one string or key', () => {
    expect(classMap('foo bar', { 'baz qux': true })).toBe('foo bar baz qux');
  });

  it('should return unique classes', () => {
    expect(classMap('foo', 'foo', { foo: true })).toBe('foo');
  });
});

describe('loadCSSStyleSheets', () => {
  it('should return empty array for empty payload', async () => {
    expect(await loadCSSStyleSheets([])).toEqual([]);
    expect(await loadCSSStyleSheets(undefined as any)).toEqual([]);
  });

  it('should load CSS from string', async () => {
    const sheets = await loadCSSStyleSheets(['.foo { color: red; }']);

    expect(sheets.length).toBe(1);
    expect(sheets[0]).toBeInstanceOf(CSSStyleSheet);
  });

  it('should cache CSSStyleSheet for the same string', async () => {
    const css = '.bar { color: blue; }';
    const sheets1 = await loadCSSStyleSheets([css]);
    const sheets2 = await loadCSSStyleSheets([css]);

    expect(sheets1[0]).toBe(sheets2[0]);
  });

  it('should handle already existing CSSStyleSheet', async () => {
    const sheet = new CSSStyleSheet();
    const sheets = await loadCSSStyleSheets([sheet]);

    expect(sheets[0]).toBe(sheet);
  });

  it('should handle mixed payload', async () => {
    const sheet = new CSSStyleSheet();
    const css = '.baz { color: green; }';
    const sheets = await loadCSSStyleSheets([sheet, css]);

    expect(sheets.length).toBe(2);
    expect(sheets[0]).toBe(sheet);
    expect(sheets[1]).toBeInstanceOf(CSSStyleSheet);
  });

  it('should handle default export objects (like from css?raw or similar)', async () => {
    const css = '.qux { color: yellow; }';
    const payload = [{ default: css }];
    const sheets = await loadCSSStyleSheets(payload as any);

    expect(sheets.length).toBe(1);
    expect(sheets[0]).toBeInstanceOf(CSSStyleSheet);
  });

  it('should throw error for invalid input', async () => {
    await expect(loadCSSStyleSheets([123 as any])).rejects.toThrow('Invalid CSS in styles');
  });
});
