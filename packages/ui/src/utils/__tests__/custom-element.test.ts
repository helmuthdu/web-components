import { define } from '../custom-element.util';

describe('custom-element.util enhancements', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should handle boolean attributes correctly', async () => {
    type TestProps = {
      color?: string;
      disabled?: boolean | string;
    };

    define<HTMLElement, TestProps>('ui-test-boolean', {
      observedAttributes: ['disabled', 'color'],
      template: (el) => `<div>${el.disabled ? 'Disabled' : 'Enabled'}</div>`,
    });

    const el = document.createElement('ui-test-boolean') as any;

    document.body.appendChild(el);

    await new Promise((resolve) => requestAnimationFrame(resolve));

    // Test default (absent)
    expect(el.disabled).toBe(null);
    expect(el.shadowRoot.textContent).toBe('Enabled');

    // Test setting true
    el.disabled = true;
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.getAttribute('disabled')).toBe('');
    expect(el.disabled).toBe(true);

    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(el.shadowRoot.textContent).toBe('Disabled');

    // Test setting false
    el.disabled = false;
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.disabled).toBe(null);

    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(el.shadowRoot.textContent).toBe('Enabled');

    // Test attribute already present as empty string
    el.setAttribute('disabled', '');
    expect(el.disabled).toBe(true);

    // Test string attribute
    el.color = 'red';
    expect(el.getAttribute('color')).toBe('red');
    expect(el.color).toBe('red');
  });

  it('should preserve input focus during reconciliation', async () => {
    type TestState = { count: number };
    define<HTMLElement, object, TestState>('ui-test-focus', {
      state: { count: 0 },
      template: (el) => `
        <div>
          <input id="my-input" value="Value ${el.state.count}">
          <button id="inc">Increment</button>
        </div>
      `,
    });

    const el = document.createElement('ui-test-focus') as any;

    document.body.appendChild(el);

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const input = el.shadowRoot.getElementById('my-input');

    input.focus();
    expect(el.shadowRoot.activeElement).toBe(input);

    // Trigger re-render
    el.state.count++;

    await new Promise((resolve) => requestAnimationFrame(resolve));

    // Input should still have focus because of smarter reconciliation
    const newInput = el.shadowRoot.getElementById('my-input');

    expect(newInput).toBe(input); // Should be the same instance
    expect(el.shadowRoot.activeElement).toBe(newInput);
    expect(newInput.value).toBe('Value 1');
  });

  it('should preserve input value state during reconciliation', async () => {
    define('ui-test-value', {
      observedAttributes: ['trigger'],
      template: () => `<input id="my-input">`,
    });

    const el = document.createElement('ui-test-value') as any;

    document.body.appendChild(el);

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const input = el.shadowRoot.getElementById('my-input');

    input.value = 'User typed this';

    // Trigger re-render by changing an attribute
    el.setAttribute('trigger', 'changed');

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const newInput = el.shadowRoot.getElementById('my-input');

    expect(newInput).toBe(input);
    expect(newInput.value).toBe('User typed this'); // Value should be preserved
  });

  it('should access elements using ref() with camelCase for kebab-case ids', async () => {
    define('ui-test-ref', {
      template: () => `
        <div>
          <input id="my-input">
          <button id="submit-btn">Submit</button>
          <div id="close-button">X</div>
        </div>
      `,
    });

    const el = document.createElement('ui-test-ref') as any;

    document.body.appendChild(el);

    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(el.ref('myInput')).toBe(el.shadowRoot.getElementById('my-input'));
    expect(el.ref('submitBtn')).toBe(el.shadowRoot.getElementById('submit-btn'));
    expect(el.ref('closeButton')).toBe(el.shadowRoot.getElementById('close-button'));
    expect(el.ref('close-button')).toBe(el.shadowRoot.getElementById('close-button'));
  });

  it('should support deep reactivity in state', async () => {
    type TestState = {
      user: {
        name: string;
        settings: {
          theme: string;
        };
      };
    };

    define<HTMLElement, object, TestState>('ui-test-deep-state', {
      state: {
        user: {
          name: 'John',
          settings: {
            theme: 'light',
          },
        },
      },
      template: (el) => `
        <div id="name">${el.state.user.name}</div>
        <div id="theme">${el.state.user.settings.theme}</div>
      `,
    });

    const el = document.createElement('ui-test-deep-state') as any;

    document.body.appendChild(el);

    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(el.shadowRoot.getElementById('name').textContent).toBe('John');
    expect(el.shadowRoot.getElementById('theme').textContent).toBe('light');

    // Update nested property
    el.state.user.name = 'Jane';

    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(el.shadowRoot.getElementById('name').textContent).toBe('Jane');

    // Update deeply nested property
    el.state.user.settings.theme = 'dark';

    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(el.shadowRoot.getElementById('theme').textContent).toBe('dark');
  });

  it('should uncheck checkbox when attribute is removed in template', async () => {
    define('ui-test-checkbox-reconcile', {
      observedAttributes: ['checked'],
      template: (el: any) => `<input type="checkbox" ${el.checked ? 'checked' : ''}>`,
    });

    const el = document.createElement('ui-test-checkbox-reconcile') as any;

    document.body.appendChild(el);

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const input = el.shadowRoot.querySelector('input');

    // Check it
    el.checked = true;

    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(input.checked).toBe(true);

    // Uncheck it via property/attribute
    el.checked = false;

    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(input.checked).toBe(false);
  });

  it('should not re-render when state property starting with _ is changed', async () => {
    let renderCount = 0;

    define('ui-test-no-render', {
      onUpdated: () => {
        renderCount++;
      },
      state: { _internal: 0, count: 0 },
      template: (el: any) => `<div>${el.state.count + el.state._internal}</div>`,
    });

    const el = document.createElement('ui-test-no-render') as any;

    document.body.appendChild(el);
    // Wait for initial renders to settle
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const baseRenderCount = renderCount;

    // Change reactive property
    el.state.count++;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(renderCount).toBe(baseRenderCount + 1);

    // Change non-reactive property
    el.state._internal++;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    // Should still be the same
    expect(renderCount).toBe(baseRenderCount + 1);
  });
});
