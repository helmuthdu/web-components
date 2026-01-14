import { configureFormElement, createSubmitFormEvent } from '../form-element.util';

describe('form-element.util', () => {
  let target: any;
  let internalsMock: any;

  beforeEach(() => {
    internalsMock = {
      reportValidity: vi.fn(),
      setFormValue: vi.fn(),
      setValidity: vi.fn(),
      validationMessage: 'Default error',
    };
    target = document.createElement('div');
    target.attachInternals = vi.fn(() => internalsMock);
  });

  describe('configureFormElement', () => {
    it('should call attachInternals', () => {
      configureFormElement(target);
      expect(target.attachInternals).toHaveBeenCalled();
    });

    it('should define value property', () => {
      configureFormElement(target);
      target.value = 'test';
      expect(target.value).toBe('test');
      expect(internalsMock.setFormValue).toHaveBeenCalledWith('test');
      expect(target.getAttribute('value')).toBe('test');
    });

    it('should handle null/undefined value by setting it to empty string', () => {
      configureFormElement(target);
      target.value = null;
      expect(target.value).toBe('');
      expect(internalsMock.setFormValue).toHaveBeenCalledWith('');

      target.value = undefined;
      expect(target.value).toBe('');
    });

    it('should define error property', () => {
      configureFormElement(target);
      expect(target.error).toBe('Default error');
    });

    it('should support setCustomValidity', () => {
      configureFormElement(target);
      target.setCustomValidity('Error message');
      expect(internalsMock.setValidity).toHaveBeenCalledWith({ customError: true }, 'Error message', target);
      expect(internalsMock.reportValidity).toHaveBeenCalled();
    });

    it('should clear validity when setCustomValidity is called with empty string', () => {
      configureFormElement(target);
      target.setCustomValidity('');
      expect(internalsMock.setValidity).toHaveBeenCalledWith({}, '', target);
    });

    it('should handle required validation on input', () => {
      configureFormElement(target);
      target.setAttribute('required', '');
      target.value = '';

      const event = new Event('input');

      target.dispatchEvent(event);

      expect(internalsMock.setValidity).toHaveBeenCalledWith({ customError: true }, 'This field is required.', target);
    });

    it('should handle required checkbox validation', () => {
      target.setAttribute('type', 'checkbox');
      target.setAttribute('required', '');
      configureFormElement(target);

      target.checked = false;
      target.dispatchEvent(new Event('input'));
      expect(internalsMock.setValidity).toHaveBeenCalledWith({ customError: true }, 'This field is required.', target);
    });

    it('should handle required checkbox validation when value is set but unchecked', () => {
      target.setAttribute('type', 'checkbox');
      target.setAttribute('required', '');
      target.setAttribute('value', 'foo');
      configureFormElement(target);

      target.checked = false;
      target.dispatchEvent(new Event('input'));
      expect(internalsMock.setValidity).toHaveBeenCalledWith({ customError: true }, 'This field is required.', target);
    });

    it('should handle checkable elements (checkbox)', () => {
      target.setAttribute('type', 'checkbox');
      configureFormElement(target);

      target.checked = true;
      expect(target.checked).toBe(true);
      expect(target.hasAttribute('checked')).toBe(true);
      expect(internalsMock.setFormValue).toHaveBeenCalledWith('on');

      target.value = 'foo';
      expect(internalsMock.setFormValue).toHaveBeenCalledWith('foo');

      target.checked = false;
      expect(target.checked).toBe(false);
      expect(target.hasAttribute('checked')).toBe(false);
      expect(internalsMock.setFormValue).toHaveBeenCalledWith('');
    });

    it('should not set form value if checkable and unchecked when value is changed', () => {
      target.setAttribute('type', 'checkbox');
      configureFormElement(target);

      target.checked = false;
      internalsMock.setFormValue.mockClear();
      target.value = 'foo';
      expect(internalsMock.setFormValue).toHaveBeenCalledWith('');
    });

    it('should handle checkable elements (radio)', () => {
      target.setAttribute('role', 'radio');
      configureFormElement(target);

      target.checked = true;
      expect(target.checked).toBe(true);
      expect(internalsMock.setFormValue).toHaveBeenCalledWith('on');
    });

    it('should respect original descriptors', () => {
      let value = 'original';

      Object.defineProperty(target, 'value', {
        configurable: true,
        get: () => value,
        set: (v) => {
          value = v;
        },
      });

      configureFormElement(target);
      expect(target.value).toBe('original');
      target.value = 'new';
      expect(value).toBe('new');
    });
  });

  describe('createSubmitFormEvent', () => {
    it('should prevent default and call handler with form data', () => {
      const handler = vi.fn();
      const eventHandler = createSubmitFormEvent(handler);

      const form = document.createElement('form');
      const input = document.createElement('input');

      input.name = 'test';
      input.value = 'value';
      form.appendChild(input);

      // FormData needs the form to be in the document or at least have elements with names
      // In JSDOM this usually works even if not in document.

      const event = {
        preventDefault: vi.fn(),
        target: form,
      } as any;

      eventHandler(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith({ test: 'value' });
    });

    it('should use transformer if provided', () => {
      const handler = vi.fn();
      const transformer = vi.fn((fd) => ({ transformed: fd.get('test') }));
      const eventHandler = createSubmitFormEvent(handler, transformer);

      const form = document.createElement('form');
      const input = document.createElement('input');

      input.name = 'test';
      input.value = 'value';
      form.appendChild(input);

      const event = {
        preventDefault: vi.fn(),
        target: form,
      } as any;

      eventHandler(event);

      expect(transformer).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith({ transformed: 'value' });
    });

    it('should report validity if form is invalid', () => {
      const handler = vi.fn();
      const eventHandler = createSubmitFormEvent(handler);

      const form = document.createElement('form');

      form.checkValidity = vi.fn(() => false);
      form.reportValidity = vi.fn();

      const event = {
        preventDefault: vi.fn(),
        target: form,
      } as any;

      eventHandler(event);

      expect(form.reportValidity).toHaveBeenCalled();
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
