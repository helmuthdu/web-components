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
  },
  onUpdated: (el) => {
    const ms = +el.timeout! || 7000;
    const timeout = ms >= 2500 && ms <= 25000 ? ms : 0;

    el.style.setProperty('--carousel-timeout', String(timeout));
    el.style.setProperty('--carousel-display', timeout > 0 ? 'block' : 'none');

    Array.from(el.children).forEach((slide, i) => {
      slide.classList.toggle('is-visible', i === el.state.activeIndex);
      slide.classList.toggle('is-hidden', i !== el.state.activeIndex);
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
    <div class="carousel">
      <div class="carousel-container">
        <slot></slot>
      </div>
      <button id="carousel-control-left" class="${classMap('carousel-control is-left', { 'is-hidden': el.controls === null })}">❮</button>
      <button id="carousel-control-right" class="${classMap('carousel-control is-right', { 'is-hidden': el.controls === null })}">❯</button>
      <ol id="carousel-navigation" class="${classMap('carousel-navigation', { 'is-hidden': el.navigation === null })}">
        ${[...Array(el.children.length)]
          .map(
            (_, idx) => /*html*/ `
          <li class="${classMap('carousel-navigation-item', { 'is-selected': el.state.activeIndex === idx })}" data-index="${idx}"></li>
        `,
          )
          .join('')}
      </ol>
    </div>
  `,
});
