import { dom } from '../../lib/create-element';
import { define } from '../../lib/custom-element';

let slideIndex = 0;
let timeout: any;

const showSlides = (slides: HTMLElement[], dots: HTMLElement[], index: number, timer = 8000) => {
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
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('border-white');
    dots[i].classList.add('border-white/60');
  }
  slides[slideIndex].classList.replace('opacity-0', 'opacity-100');
  dots[slideIndex].classList.replace('border-white/60', 'border-white');

  if (timer === 0) return;
  if (timeout) clearInterval(timeout);
  timeout = setTimeout(() => showSlides(slides, dots, slideIndex + 1), timer);
};

define('ui-carousel', {
  props: {},
  onConnected: ({ children, shadowRoot }) => {
    showSlides(children, shadowRoot.querySelectorAll('li'), slideIndex);
  },
  template: ({ dataset, children, shadowRoot }) => [
    dom('link', { rel: 'stylesheet', href: '/tailwind.css' }),
    dom(
      'style',
      {},
      `.carousel { -ms-overflow-style: none; scrollbar-width: none; } .carousel::-webkit-scrollbar { display: none; }`
    ),
    dom(
      'div',
      { className: 'relative w-full' },
      dom(
        'div',
        { id: 'root', className: 'carousel snap-x snap-mandatory scroll-smooth overflow-x-auto flex relative w-full' },
        dom('slot')
      ),
      dom(
        'button',
        {
          className: 'absolute inset-y-0 left-0 w-12 text-white',
          onclick: () => showSlides(children, shadowRoot.querySelectorAll('li'), slideIndex - 1)
        },
        '❮'
      ),
      dom(
        'button',
        {
          className: 'absolute inset-y-0 right-0 w-12 text-white',
          onclick: () => showSlides(children, shadowRoot.querySelectorAll('li'), slideIndex + 1)
        },
        '❯'
      ),
      dom(
        'ol',
        { className: 'absolute inset-x-0 bottom-0 flex gap-2 justify-center pb-4' },
        [...Array(children.length)].map((_, idx) =>
          dom('li', {
            className: 'transition duration-1000 border-b-4 w-8 border-white/60 hover:border-white',
            onclick: () => {
              showSlides(children, shadowRoot.querySelectorAll('li'), idx);
            }
          })
        )
      )
    )
  ]
});
