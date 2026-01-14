import { div, span, button, h1 } from '../html-elements.util';

describe('html-elements.util', () => {
  it('should create elements with props and children', () => {
    const el = div({ class: 'foo', id: 'test' }, 'Hello');

    expect(el.tagName).toBe('DIV');
    expect(el.id).toBe('test');
    expect(el.className).toBe('foo');
    expect(el.textContent).toBe('Hello');
  });

  it('should create elements with multiple children', () => {
    const el = div({}, span({}, 'Left'), span({}, 'Right'));

    expect(el.childNodes.length).toBe(2);
    expect(el.childNodes[0].textContent).toBe('Left');
    expect(el.childNodes[1].textContent).toBe('Right');
  });

  it('should create different tags correctly', () => {
    expect(button({ type: 'submit' }).tagName).toBe('BUTTON');
    expect(h1({}, 'Title').tagName).toBe('H1');
  });

  it('should support optional props for better DX', () => {
    const el = div({}, 'Just text');

    expect(el.tagName).toBe('DIV');
    expect(el.textContent).toBe('Just text');
    expect(el.attributes.length).toBe(0);

    const el2 = span({}, span({}, 'Nested'));

    expect(el2.tagName).toBe('SPAN');
    expect(el2.firstElementChild?.tagName).toBe('SPAN');
    expect(el2.firstElementChild?.textContent).toBe('Nested');
  });

  it('should handle multiple children without props', () => {
    const el = div({}, span({}, 'One'), span({}, 'Two'));

    expect(el.childNodes.length).toBe(2);
    expect(el.childNodes[0].textContent).toBe('One');
    expect(el.childNodes[1].textContent).toBe('Two');
  });
});
