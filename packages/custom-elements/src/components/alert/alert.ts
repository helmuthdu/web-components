import { classMap, define } from '../../lib/custom-element';
import styles from './alert.css';

export type DataSet = {
  append?: string;
  variant?: 'error' | 'success' | 'warning' | 'info' | undefined;
};

define<DataSet>('tw-alert', {
  data: {
    append: undefined,
    variant: undefined
  },
  onAttributeChanged(name, prev, curr, { shadowRoot }) {
    switch (name) {
      case 'variant': {
        const toggleVariantClasses = (id: string) => {
          const el = shadowRoot?.getElementById(id) as HTMLElement;
          el.classList.remove(`alert-${prev}`);
          el.classList.add(`alert-${curr}`);
        };
        toggleVariantClasses('alert');
        toggleVariantClasses('close-button');
        break;
      }
      case 'append': {
        const el = shadowRoot?.getElementById('alert') as HTMLElement;
        if (prev) el.classList.remove(...prev.split(' '));
        if (curr) el.classList.add(...curr.split(' '));
        break;
      }
    }
  },
  onConnected: ({ event, fire, remove }) => {
    event(
      'close-button',
      'click',
      () => {
        fire('close');
        remove();
      },
      { once: true }
    );
  },
  styles: [styles],
  template: ({ dataset }) => /*html*/ `
    <link rel="stylesheet" href="/tailwind.css" />
    <div id="alert" class="${classMap('alert', `alert-${dataset.variant}`, dataset.append)}" role="alert">
      <div class="text-sm"><slot></slot></div>
      <button
        id="close-button"
        type="button"
        class="inline-flex items-center ml-2 -mr-2 p-0.5 h-8 w-8 alert-${dataset.variant}"
        data-collapse-toggle="alert"
        aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
  `
});
