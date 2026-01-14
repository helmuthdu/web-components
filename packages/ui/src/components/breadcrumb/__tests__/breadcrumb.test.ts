import '../breadcrumb';
import '../breadcrumbs';

describe('Breadcrumb Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render breadcrumbs with links and text', async () => {
    document.body.innerHTML = `
      <ui-breadcrumbs>
        <ui-breadcrumb href="/">Home</ui-breadcrumb>
        <ui-breadcrumb href="/docs">Docs</ui-breadcrumb>
        <ui-breadcrumb>Breadcrumbs</ui-breadcrumb>
      </ui-breadcrumbs>
    `;

    const breadcrumbs = document.querySelector('ui-breadcrumbs')!;
    const items = document.querySelectorAll('ui-breadcrumb');

    // Wait for render
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(breadcrumbs).not.toBeNull();
    expect(items.length).toBe(3);

    // Check first item (link)
    const firstShadow = items[0].shadowRoot!;
    const firstLink = firstShadow.querySelector('a');

    expect(firstLink).not.toBeNull();
    expect(firstLink?.getAttribute('href')).toBe('/');
    expect(items[0].textContent?.trim()).toBe('Home');

    // Check last item (text/current page)
    const lastShadow = items[2].shadowRoot!;
    const lastSpan = lastShadow.querySelector('.breadcrumb-text');

    expect(lastShadow.querySelector('a')).toBeNull();
    expect(lastSpan).not.toBeNull();
    expect(lastSpan?.getAttribute('aria-current')).toBe('page');
    expect(items[2].textContent?.trim()).toBe('Breadcrumbs');
  });

  it('should render separators', async () => {
    document.body.innerHTML = `
      <ui-breadcrumbs>
        <ui-breadcrumb href="/">Home</ui-breadcrumb>
        <ui-breadcrumb>End</ui-breadcrumb>
      </ui-breadcrumbs>
    `;

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const items = document.querySelectorAll('ui-breadcrumb');

    const firstSeparator = items[0].shadowRoot!.querySelector('.breadcrumb-separator');

    expect(firstSeparator).not.toBeNull();
    expect(firstSeparator?.textContent?.trim()).toBe('/');
  });

  it('should support custom separators', async () => {
    document.body.innerHTML = `
      <ui-breadcrumbs>
        <ui-breadcrumb href="/">
          Home
          <span slot="separator">></span>
        </ui-breadcrumb>
        <ui-breadcrumb>End</ui-breadcrumb>
      </ui-breadcrumbs>
    `;

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const items = document.querySelectorAll('ui-breadcrumb');

    const firstSeparator = items[0].shadowRoot!.querySelector('.breadcrumb-separator');

    expect(firstSeparator).not.toBeNull();

    const slot = firstSeparator!.querySelector('slot') as HTMLSlotElement;
    const assigned = slot.assignedNodes();

    expect(assigned.length).toBeGreaterThan(0);
    expect(assigned[0].textContent?.trim()).toBe('>');
  });

  it('should support custom aria-label', async () => {
    document.body.innerHTML = `
      <ui-breadcrumbs label="Main navigation">
        <ui-breadcrumb>Home</ui-breadcrumb>
      </ui-breadcrumbs>
    `;

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const breadcrumbs = document.querySelector('ui-breadcrumbs')!;
    const nav = breadcrumbs.shadowRoot!.querySelector('nav');

    expect(nav?.getAttribute('aria-label')).toBe('Main navigation');
  });
});
