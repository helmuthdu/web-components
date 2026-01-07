import { describe, it, expect } from 'vitest';

import { classMap } from '../styling-element.util';

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
