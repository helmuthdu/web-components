import { beforeAll, describe, expect, it } from 'vitest';

describe('Box Component', () => {
  beforeAll(async () => {
    await import('./box');
  });

  it('should exists', () => {
    expect(customElements.get('ui-box')).toBeTruthy();
  });
});
