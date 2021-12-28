import { define, event, uuid } from '../../utils/component.util';
import { pickClassNames } from '../../utils/styling.util';
import { Color } from '../../types';
import styles from './alert.css';

export type Attributes = {
  append?: string;
  variant?: Color;
};

export const attributes: Attributes = {
  append: undefined,
  variant: 'neutral'
};

define<Attributes>('tw-alert', {
  attributes,
  onConnected: host => {
    event(
      'close',
      'click',
      () => {
        host.remove();
      },
      { once: true }
    );
  },
  styles: [styles],
  template: attrs => {
    const id = uuid();
    return /*html*/ `
      <link rel="stylesheet" href="/tailwind.css" />
      <div id="${id}" class="${pickClassNames('alert', `alert-${attrs.variant}`, attrs.append)}" role="alert">
        <div class="text-sm"><slot></slot></div>
        <button 
          ref="close"
          type="button" 
          class="inline-flex items-center ml-2 -mr-2 p-0.5 h-8 w-8 alert-${attrs.variant}" 
          data-collapse-toggle="${id}"
          aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    `;
  }
});
