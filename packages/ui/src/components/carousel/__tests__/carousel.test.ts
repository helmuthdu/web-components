import '../carousel';
import '../carousel-image';

describe('Carousel Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render navigation items based on the number of slides', async () => {
    document.body.innerHTML = `
      <ui-carousel navigation>
        <ui-carousel-image src="img1.jpg">Slide 1</ui-carousel-image>
        <ui-carousel-image src="img2.jpg">Slide 2</ui-carousel-image>
      </ui-carousel>
    `;

    const carousel = document.querySelector('ui-carousel')!;

    // Wait for RAFs
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const shadowRoot = carousel.shadowRoot!;
    const navItems = shadowRoot.querySelectorAll('.carousel-navigation-item');

    expect(navItems.length).toBe(2);
  });

  it('should change slides when clicking arrow buttons', async () => {
    document.body.innerHTML = `
      <ui-carousel controls="true">
        <ui-carousel-image src="img1.jpg">Slide 1</ui-carousel-image>
        <ui-carousel-image src="img2.jpg">Slide 2</ui-carousel-image>
      </ui-carousel>
    `;

    const carousel = document.querySelector('ui-carousel')!;

    // Wait for RAFs
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const shadowRoot = carousel.shadowRoot!;
    const nextBtn = shadowRoot.getElementById('carousel-control-right');
    const prevBtn = shadowRoot.getElementById('carousel-control-left');

    expect(nextBtn).not.toBeNull();
    expect(prevBtn).not.toBeNull();

    const slides = carousel.children;

    expect(slides[0].classList.contains('is-visible')).toBe(true);
    expect(slides[1].classList.contains('is-visible')).toBe(false);

    nextBtn?.click();

    // Wait for render
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(slides[0].classList.contains('is-visible')).toBe(false);
    expect(slides[1].classList.contains('is-visible')).toBe(true);
  });
});
