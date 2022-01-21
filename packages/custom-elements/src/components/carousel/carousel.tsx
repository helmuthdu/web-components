/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

let slideIndex = 0;
let timeout: any;

const showSlides = (index: number, slides: HTMLCollection, dots: HTMLLIElement[], timer = 8000) => {
  slideIndex = index;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('opacity-100');
    slides[i].classList.add('opacity-0');
  }
  slides[slideIndex].classList.replace('opacity-0', 'opacity-100');

  if (dots.length > 0) {
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('border-white');
      dots[i].classList.add('border-white/60');
    }
    dots[slideIndex].classList.replace('border-white/60', 'border-white');
  }

  if (timer === 0) return;
  if (timeout) clearInterval(timeout);
  timeout = setTimeout(() => showSlides(slideIndex + 1, slides, dots, timer), timer);
};

export type Props = {
  dataset: { noIndicators?: boolean; noButtons?: boolean; timeout: number };
};

define<Props>('ui-carousel', {
  props: {
    dataset: {
      noIndicators: undefined,
      noButtons: undefined,
      timeout: 8000
    }
  },
  onConnected: ({ children, dataset, shadowRoot }) => {
    showSlides(slideIndex, children, Array.from(shadowRoot?.querySelectorAll('li') ?? []), +dataset.timeout);
  },
  template: ({ children, dataset, shadowRoot }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <style
        dangerouslySetInnerHTML={{
          __html: `.carousel { -ms-overflow-style: none; scrollbar-width: none; } .carousel::-webkit-scrollbar { display: none; }`
        }}
      />
      <div id="root" className="relative w-full">
        <div className="carousel snap-x snap-mandatory scroll-smooth overflow-x-auto flex relative w-full">
          <slot />
        </div>
        {!dataset.noButtons && (
          <>
            <button
              className="absolute inset-y-0 left-0 w-12 text-white"
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
              className="absolute inset-y-0 right-0 w-12 text-white"
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
        {!dataset.noIndicators && (
          <ol className="absolute inset-x-0 bottom-0 flex gap-2 justify-center pb-4">
            {[...Array(children.length)].map((_, idx) => (
              <li
                className="transition duration-1000 border-b-4 w-8 border-white/60 hover:border-white"
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
