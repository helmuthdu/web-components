import { describe, it, expect, beforeEach, vi } from 'vitest';

import '../toast';

describe('Toast Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should be removed from DOM when close button is clicked', async () => {
    document.body.innerHTML = `
      <ui-toast>
        <span slot="header">Header</span>
        Toast message
      </ui-toast>
    `;

    const toast = document.querySelector('ui-toast')!;

    // Wait for initial render
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const shadowRoot = toast.shadowRoot!;
    const closeButton = shadowRoot.getElementById('close-button');

    expect(closeButton).not.toBeNull();

    // Mock animationend event since JSDOM doesn't run CSS animations
    const animationPromise = new Promise((resolve) => {
      toast.shadowRoot!.firstElementChild!.addEventListener('animationend', resolve);
    });

    closeButton?.click();

    // Wait for re-render
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(toast.shadowRoot!.firstElementChild!.classList.contains('is-hidden')).toBe(true);

    // Manually dispatch animationend because JSDOM won't
    toast.shadowRoot!.firstElementChild!.dispatchEvent(new Event('animationend', { bubbles: true }));

    await animationPromise;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(document.querySelector('ui-toast')).toBeNull();
  });

  it('should be removed from DOM when close button is clicked (headless)', async () => {
    document.body.innerHTML = `
      <ui-toast>
        Toast message
      </ui-toast>
    `;

    const toast = document.querySelector('ui-toast')!;

    // Wait for initial render
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const shadowRoot = toast.shadowRoot!;
    const closeButton = shadowRoot.getElementById('close-button');

    expect(closeButton).not.toBeNull();

    closeButton?.click();

    // Wait for re-render
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(toast.shadowRoot!.firstElementChild!.classList.contains('is-hidden')).toBe(true);

    // Manually dispatch animationend
    toast.shadowRoot!.firstElementChild!.dispatchEvent(new Event('animationend', { bubbles: true }));

    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(document.querySelector('ui-toast')).toBeNull();
  });
  it('should be removed from DOM when close button is clicked after structure change', async () => {
    document.body.innerHTML = `
      <ui-toast>
        Toast message
      </ui-toast>
    `;

    const toast = document.querySelector('ui-toast')!;

    // Wait for initial render
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // Change to have header
    const header = document.createElement('span');

    header.slot = 'header';
    header.textContent = 'New Header';
    toast.appendChild(header);

    // Wait for re-render
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const shadowRoot = toast.shadowRoot!;
    const closeButton = shadowRoot.getElementById('close-button');

    expect(closeButton).not.toBeNull();

    closeButton?.click();

    // Wait for re-render
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // IF IT FAILS HERE, it means the event listener was lost
    expect(toast.shadowRoot!.firstElementChild!.classList.contains('is-hidden')).toBe(true);
  });

  it('should maintain is-hidden class even after re-render', async () => {
    document.body.innerHTML = `
      <ui-toast important>
        Toast message
      </ui-toast>
    `;

    const toast = document.querySelector('ui-toast')! as any;

    // Wait for initial render
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const root = toast.shadowRoot!.firstElementChild!;
    const closeButton = toast.shadowRoot!.getElementById('close-button');

    closeButton?.click();

    // Wait for re-render
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(root.classList.contains('is-hidden')).toBe(true);

    // Trigger manual re-render
    toast.render();

    // Wait for render
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // This is expected to FAIL before the fix
    expect(root.classList.contains('is-hidden')).toBe(true);
  });

  it('should be removed from DOM after timeout if not important', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = `
      <ui-toast timeout="1000">
        Toast message
      </ui-toast>
    `;

    const toast = document.querySelector('ui-toast')!;

    // The toast should move itself to #toasts container synchronously during connectedCallback
    const container = document.getElementById('toasts');

    expect(container).not.toBeNull();
    expect(toast.parentElement).toBe(container);

    // Fast-forward time
    vi.advanceTimersByTime(1000);

    // Wait for re-render (RAF)
    vi.advanceTimersByTime(16);

    // Should have 'is-hidden' class
    expect(toast.shadowRoot!.firstElementChild!.classList.contains('is-hidden')).toBe(true);

    // Dispatch animationend
    toast.shadowRoot!.firstElementChild!.dispatchEvent(new Event('animationend', { bubbles: true }));

    expect(document.querySelector('ui-toast')).toBeNull();
    vi.useRealTimers();
  });

  it('should not be removed from DOM after timeout if important', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = `
      <ui-toast important timeout="1000">
        Toast message
      </ui-toast>
    `;

    const toast = document.querySelector('ui-toast')!;

    // Wait for initial render
    vi.advanceTimersByTime(32);

    const root = toast.shadowRoot!.firstElementChild!;

    expect(root.classList.contains('is-important')).toBe(true);

    // Fast-forward time
    vi.advanceTimersByTime(1000);

    // Wait for potential re-render
    vi.advanceTimersByTime(16);

    // Should NOT have 'is-hidden' class
    expect(root.classList.contains('is-hidden')).toBe(false);
    expect(document.querySelector('ui-toast')).not.toBeNull();

    vi.useRealTimers();
  });
});
