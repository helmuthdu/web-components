import { define } from '../../utils/custom-element.util';

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
  onConnected: el => {
    const _showSlides = (idx: number) =>
      showSlides(idx, el.children, Array.from(el.shadowRoot?.querySelectorAll('li') ?? []), +el.dataset.timeout);

    _showSlides(slideIndex);

    el.event('carousel-button-left', 'click', () => _showSlides(slideIndex - 1));

    el.event('carousel-button-right', 'click', () => _showSlides(slideIndex + 1));

    el.event(
      'carousel-navigation',
      'click',
      (e: Event) => {
        e.stopPropagation();
        const idx = (e.target as HTMLLIElement).dataset.index;
        if (idx) _showSlides(+idx);
      },
      true
    );
  },
  template: el => /*html*/ `
    <style>
      .carousel {
        position: relative;
        inline-size: var(--size-full);
      }

      .carousel-container {
        position: relative;
        display: flex;
        inline-size: var(--size-full);
        overflow-x: auto;
        -ms-overflow-style: none;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
      }

      ::slotted(.carousel-image) {
        position: absolute;
        inline-size: var(--size-full);
        transition-timing-function: ease-in;
        transition-duration: 700ms;
        transition-property: opacity;
      }

      ::slotted(.carousel-image.is-visible) {
        opacity: 1;
      }

      ::slotted(.carousel-image.is-hidden) {
        opacity: 0;
      }

      ::slotted(.carousel-image:first-child) {
        position: relative;
      }

      .carousel::-webkit-scrollbar {
        display: none;
      }

      .carousel-button {
        position: absolute;
        inset-block: 0;
        inline-size: var(--size-12);
        color: var(--color-content-body);
        background-color: transparent;
        border: none;
        cursor: pointer;

        &.is-left {
          inset-inline-start: 0;
        }

        &.is-right {
          inset-inline-end: 0;
        }
      }

      .carousel-navigation {
        position: absolute;
        inset-block-end: 0;
        inset-inline: 0;
        display: flex;
        gap: var(--size-2);
        justify-content: center;
        list-style: none;
      }

      .carousel-navigation-item {
        inline-size: var(--size-8);
        cursor: pointer;
        border-block-end: var(--border-4) solid rgb(255 255 255/ 60%);
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 700ms;
        transition-property: border-color;

        &.is-selected,
        &:hover {
          border-color: rgb(255 255 255);
        }
      }
    </style>
    <div id="root" class="carousel">
      <div class="carousel-container">
        <slot></slot>
      </div>
      ${
        el.dataset.buttons
          ? /*html*/ `
          <button id="carousel-button-left" class="carousel-button is-left">❮</button>
          <button id="carousel-button-right" class="carousel-button is-right">❯</button>
        `
          : ''
      }
      ${
        el.dataset.indicators
          ? /*html*/ `
          <ol id="carousel-navigation" class="carousel-navigation">
            ${[...Array(el.children.length)].map((_, idx) => /*html*/ `<li class="carousel-navigation-item" data-index="${idx}"></li>`).join('')}
          </ol>
        `
          : ''
      }
    </div>
  `
});
