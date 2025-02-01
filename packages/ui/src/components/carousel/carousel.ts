import { classMap, define } from '../../utils/custom-element.util';
import style from './carousel.css?raw';

const CarouselController: {
  go(index: number): void;
  index: number;
  navigation: HTMLLIElement[];
  next(): void;
  previous(): void;
  slides: HTMLCollection;
  timeout: number;
  timeoutFn?: NodeJS.Timeout;
} = {
  go(index: number) {
    const { navigation, slides, timeout, timeoutFn } = CarouselController;

    if (index >= slides.length) {
      index = 0;
    } else if (index < 0) {
      index = slides.length - 1;
    }

    CarouselController.index = index;

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('is-visible');
      slides[i].classList.add('carousel-image', 'is-hidden');
    }
    slides[index].classList.replace('is-hidden', 'is-visible');

    if (navigation.length > 0) {
      for (let i = 0; i < navigation.length; i++) {
        navigation[i].classList.remove('is-selected');
      }
      navigation[index].classList.add('is-selected');
    }

    if (timeout === 0) return;

    if (timeoutFn) clearTimeout(CarouselController.timeoutFn);

    CarouselController.timeoutFn = setTimeout(
      () => CarouselController.go(CarouselController.index + 1),
      CarouselController.timeout,
    );
  },
  index: 0,
  navigation: [],
  next: () => CarouselController.go(CarouselController.index + 1),
  previous: () => CarouselController.go(CarouselController.index - 1),
  slides: {} as HTMLCollection,
  timeout: 8000,
  timeoutFn: undefined,
};

export type Props = {
  dataset: { controls?: string; navigation?: string; timeout?: string };
};

define('ui-carousel', {
  onConnected: (el) => {
    CarouselController.slides = el.children;
    CarouselController.navigation = Array.from(el.shadowRoot?.querySelectorAll('li') ?? []);
    CarouselController.timeout = el.dataset.timeout !== undefined ? +el.dataset.timeout : 8000;
    CarouselController.go(0);

    el.event('carousel-control-left', 'click', CarouselController.previous);
    el.event('carousel-control-right', 'click', CarouselController.next);
    el.event(
      'carousel-navigation',
      'click',
      (e: Event) => {
        e.stopPropagation();

        const idx = (e.target as HTMLLIElement).dataset.index;

        if (idx) CarouselController.go(+idx);
      },
      { capture: true },
    );
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
