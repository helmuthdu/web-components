import { dom, fragment, raw } from '../create-element.util';

describe('create-element.util', () => {
  describe('dom', () => {
    it('should create a simple element', () => {
      const el = dom('div');

      expect(el).toBeInstanceOf(HTMLDivElement);
      expect(el.tagName).toBe('DIV');
    });

    it('should create an element with attributes', () => {
      const el = dom('input', { id: 'my-input', type: 'text', value: 'hello' });

      expect(el.type).toBe('text');
      expect(el.value).toBe('hello');
      expect(el.id).toBe('my-input');
    });

    it('should handle class attributes', () => {
      const el1 = dom('div', { class: 'foo bar' });

      expect(el1.className).toBe('foo bar');

      const el2 = dom('div', { class: 'baz' });

      expect(el2.className).toBe('baz');

      const el3 = dom('div', { class: ['a', 'b'] });

      expect(el3.className).toBe('a b');
    });

    it('should handle class attributes with multiple values and deduplication', () => {
      const el = dom('div', { class: { bar: false, baz: true, foo: true } as any });

      expect(el.className).toBe('baz foo');
    });

    it('should handle class attributes with object (classMap support)', () => {
      const el = dom('div', { class: { 'is-active': true, 'is-hidden': false } } as any);

      expect(el.className).toBe('is-active');
    });

    it('should handle dataset attributes', () => {
      const el = dom('div', { dataset: { role: 'admin', userId: '123' } } as any);

      expect(el.dataset.userId).toBe('123');
      expect(el.dataset.role).toBe('admin');
    });

    it('should handle event listeners', () => {
      let clicked = false;
      const el = dom('button', { onclick: () => (clicked = true) });

      el.click();
      expect(clicked).toBe(true);
    });

    it('should handle boolean attributes', () => {
      const el1 = dom('button', { disabled: true });

      expect(el1.hasAttribute('disabled')).toBe(true);
      expect(el1.disabled).toBe(true);

      const el2 = dom('button', { disabled: false });

      expect(el2.hasAttribute('disabled')).toBe(false);
      expect(el2.disabled).toBe(false);
    });

    it('should handle object attributes (style)', () => {
      const el = dom('div', { style: { color: 'red', marginTop: '10px' } });

      expect(el.style.color).toBe('red');
      expect(el.style.marginTop).toBe('10px');
    });

    it('should handle children', () => {
      const el = dom('div', {}, 'text', dom('span', {}, 'inner'), [dom('p', {}, 'p1'), dom('p', {}, 'p2')]);

      expect(el.childNodes.length).toBe(4);
      expect(el.childNodes[0].textContent).toBe('text');
      expect(el.childNodes[1]).toBeInstanceOf(HTMLSpanElement);
      expect(el.childNodes[2]).toBeInstanceOf(HTMLParagraphElement);
      expect(el.childNodes[3]).toBeInstanceOf(HTMLParagraphElement);
    });

    it('should create SVG elements', () => {
      const el = dom('svg', { width: '100' } as any) as SVGSVGElement;

      expect(el).toBeInstanceOf(SVGElement);
      expect(el.namespaceURI).toBe('http://www.w3.org/2000/svg');
      expect(el.getAttribute('width')).toBe('100');
    });

    it('should correctly identify and create complex SVG elements (foreignObject)', () => {
      const el = dom('foreignObject', {}) as SVGForeignObjectElement;

      expect(el).toBeInstanceOf(SVGElement);
      expect(el.namespaceURI).toBe('http://www.w3.org/2000/svg');
      expect(el.tagName.toLowerCase()).toBe('foreignobject');
    });

    it('should handle functional components', () => {
      const MyComp = (props: any, children: any[]) => dom('div', props, ...children);
      const el = dom(MyComp as any, { id: 'test' }, 'hello');

      expect(el.tagName).toBe('DIV');
      expect(el.id).toBe('test');
      expect(el.textContent).toBe('hello');
    });
  });

  describe('fragment', () => {
    it('should create a document fragment', () => {
      const frag = fragment(dom('div'), dom('span'));

      expect(frag).toBeInstanceOf(DocumentFragment);
      expect(frag.childNodes.length).toBe(2);
    });
  });

  describe('raw', () => {
    it('should parse HTML string', () => {
      const nodes = raw('<div>1</div><span>2</span>');

      expect(nodes.length).toBe(2);
      expect((nodes[0] as Element).tagName).toBe('DIV');
      expect((nodes[1] as Element).tagName).toBe('SPAN');
    });

    it('should remove script tags', () => {
      const nodes = raw('<div>safe</div><script>alert(1)</script>');

      expect(nodes.length).toBe(1);
      expect((nodes[0] as Element).tagName).toBe('DIV');
    });
  });
});
