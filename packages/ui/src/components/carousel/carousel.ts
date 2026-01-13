import { classMap, define } from '../../utils/custom-element.util';
import style from './carousel.css?raw';

type CarouselProps = {
  controls: string | null;
  navigation: string | null;
  timeout: string | null;
};

type CarouselState = {
  _timeoutId?: number;
  activeIndex: number;
};

define<HTMLElement, CarouselProps, CarouselState>('ui-carousel', {
  observedAttributes: ['controls', 'navigation', 'timeout'],
  onConnected: (el) => {
    el.event('carousel-control-left', 'click', () => {
      el.state.activeIndex = (el.state.activeIndex - 1 + el.children.length) % el.children.length;
    });

    el.event('carousel-control-right', 'click', () => {
      el.state.activeIndex = (el.state.activeIndex + 1) % el.children.length;
    });

    el.event('carousel-navigation', 'click', (e: Event) => {
      const idx = (e.target as HTMLLIElement).dataset.index;

      if (idx) el.state.activeIndex = +idx;
    });

    el.event(el, 'keydown', (e: any) => {
      if (e.key === 'ArrowLeft') {
        el.state.activeIndex = (el.state.activeIndex - 1 + el.children.length) % el.children.length;
      } else if (e.key === 'ArrowRight') {
        el.state.activeIndex = (el.state.activeIndex + 1) % el.children.length;
      }
    });
  },
  onUpdated: (el) => {
    const ms = +el.timeout! || 7000;
    const timeout = ms >= 2500 && ms <= 25000 ? ms : 0;

    el.style.setProperty('--carousel-timeout', String(timeout));
    el.style.setProperty('--carousel-display', timeout > 0 ? 'block' : 'none');

    Array.from(el.children).forEach((slide, i) => {
      const isVisible = i === el.state.activeIndex;

      slide.classList.toggle('is-visible', isVisible);
      slide.classList.toggle('is-hidden', !isVisible);
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-hidden', (!isVisible).toString());
      slide.setAttribute('aria-label', `${i + 1} of ${el.children.length}`);
    });

    // Handle auto-advance
    if (el.state._timeoutId) {
      el.clearTimeout(el.state._timeoutId);
    }

    if (timeout > 0) {
      el.state._timeoutId = el.setTimeout(() => {
        el.state.activeIndex = (el.state.activeIndex + 1) % el.children.length;
      }, timeout);
    }
  },
  state: { _timeoutId: undefined, activeIndex: 0 },
  styles: [style],
  template: (el) => /*html*/ `
    <div class="carousel" role="region" aria-roledescription="carousel" aria-label="carousel">
      <div class="carousel-container" aria-live="polite">
        <slot></slot>
      </div>
      <button id="carousel-control-left" class="${classMap('carousel-control is-left', { 'is-hidden': el.controls === null })}" aria-label="Previous slide">❮</button>
      <button id="carousel-control-right" class="${classMap('carousel-control is-right', { 'is-hidden': el.controls === null })}" aria-label="Next slide">❯</button>
      <ol id="carousel-navigation" class="${classMap('carousel-navigation', { 'is-hidden': el.navigation === null })}" role="tablist" aria-label="Slides">
        ${[...Array(el.children.length)]
          .map(
            (_, idx) => /*html*/ `
          <li
            class="${classMap('carousel-navigation-item', { 'is-selected': el.state.activeIndex === idx })}"
            data-index="${idx}"
            role="tab"
            aria-selected="${el.state.activeIndex === idx}"
            aria-label="Go to slide ${idx + 1}"
            tabindex="${el.state.activeIndex === idx ? 0 : -1}"
          ></li>
        `,
          )
          .join('')}
      </ol>
    </div>
  `,
});
