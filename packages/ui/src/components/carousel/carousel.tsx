/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

let slideIndex = 0;
let timeout: NodeJS.Timeout;

const showSlides = (index: number, slides: HTMLCollection, dots: HTMLLIElement[], timer = 8000) => {
  slideIndex = index;

  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('is-visible');
    slides[i].classList.add('carousel-image', 'is-hidden');
  }
  slides[slideIndex].classList.replace('is-hidden', 'is-visible');

  if (dots.length > 0) {
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('is-selected');
    }
    dots[slideIndex].classList.add('is-selected');
  }

  if (timer === 0) return;
  if (timeout) clearInterval(timeout);
  timeout = setTimeout(() => showSlides(slideIndex + 1, slides, dots, timer), timer);
};

export type Props = {
  dataset: { indicators?: boolean; buttons?: boolean; timeout: number };
};

define<Props>('ui-carousel', {
  props: {
    dataset: {
      indicators: undefined,
      buttons: undefined,
      timeout: 8000
    }
  },
  onConnected: ({ children, dataset, shadowRoot }) => {
    const observer = new MutationObserver(() => {
      showSlides(slideIndex, children, Array.from(shadowRoot?.querySelectorAll('li') ?? []), +dataset.timeout);
      observer.disconnect();
    });
    observer.observe(shadowRoot as ShadowRoot, { childList: true });
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./carousel.css')],
  template: ({ children, dataset, shadowRoot }) => (
    <>
      <div id="host" className="carousel">
        <div className="carousel-container">
          <slot />
        </div>
        {dataset.buttons && (
          <>
            <button
              className="carousel-button is-left"
              onClick={() =>
                showSlides(
                  slideIndex - 1,
                  children,
                  Array.from(shadowRoot?.querySelectorAll('li') ?? []),
                  +dataset.timeout
                )
              }>
              ❮
            </button>
            <button
              className="carousel-button is-right"
              onClick={() =>
                showSlides(
                  slideIndex + 1,
                  children,
                  Array.from(shadowRoot?.querySelectorAll('li') ?? []),
                  +dataset.timeout
                )
              }>
              ❯
            </button>
          </>
        )}
        {dataset.indicators && (
          <ol className="carousel-navigation">
            {[...Array(children.length)].map((_, idx) => (
              <li
                className="carousel-navigation-item"
                onClick={() => {
                  showSlides(idx, children, Array.from(shadowRoot?.querySelectorAll('li') ?? []), +dataset.timeout);
                }}
              />
            ))}
          </ol>
        )}
      </div>
    </>
  )
});
