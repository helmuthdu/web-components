import { classMap, define, WebComponent } from '../../utils/custom-element.util';
import style from './carousel.css?raw';

class CarouselController {
  private slides: HTMLCollection;
  private navigation: HTMLLIElement[];
  private timeout: number;
  private timeoutFn?: NodeJS.Timeout;
  private index: number = 0;

  constructor(
    private component: WebComponent,
    timeout: number,
  ) {
    this.slides = component.children;
    this.navigation = Array.from(component.shadowRoot?.querySelectorAll('li') ?? []);
    this.timeout = timeout;

    this.setupEventListeners();
    this.go(0);
  }

  go(index: number) {
    if (index >= this.slides.length) {
      index = 0;
    } else if (index < 0) {
      index = this.slides.length - 1;
    }

    this.index = index;

    Array.from(this.slides).forEach((slide, i) => {
      slide.classList.toggle('is-visible', i === index);
      slide.classList.toggle('is-hidden', i !== index);
    });

    this.navigation.forEach((nav, i) => {
      nav.classList.toggle('is-selected', i === index);
    });

    if (this.timeout > 0) {
      if (this.timeoutFn) clearTimeout(this.timeoutFn);

      this.timeoutFn = setTimeout(() => this.go(this.index + 1), this.timeout);
    }
  }

  next = () => this.go(this.index + 1);
  previous = () => this.go(this.index - 1);

  private setupEventListeners() {
    this.component.event('carousel-control-left', 'click', this.previous);
    this.component.event('carousel-control-right', 'click', this.next);
    this.component.event(
      'carousel-navigation',
      'click',
      (e: Event) => {
        const idx = (e.target as HTMLLIElement).dataset.index;

        if (idx) this.go(+idx);
      },
      { capture: true },
    );
  }
}

export type Props = {
  dataset: { controls?: string; navigation?: string; timeout?: string };
};

define('ui-carousel', {
  onConnected: (el) => {
    const ms = +el.dataset.timeout! || 7000;
    const timeout = ms >= 2500 && ms <= 25000 ? ms : 0;

    el.style.setProperty('--carousel-timeout', String(timeout));
    new CarouselController(el, timeout);
  },
  styles: [style],
  template: (el) => /*html*/ `
    <div class="carousel">
      <div class="carousel-container">
        <slot></slot>
      </div>
      <button id="carousel-control-left" class="${classMap('carousel-control is-left', { 'is-hidden': el.dataset.controls !== '' })}">❮</button>
      <button id="carousel-control-right" class="${classMap('carousel-control is-right', { 'is-hidden': el.dataset.controls !== '' })}">❯</button>
      <ol id="carousel-navigation" class="${classMap('carousel-navigation', { 'is-hidden': el.dataset.navigation !== '' })}">
        ${[...Array(el.children.length)].map((_, idx) => /*html*/ `<li class="carousel-navigation-item" data-index="${idx}"></li>`).join('')}
      </ol>
    </div>
  `,
});
