import { classMap, define, event, uuid } from '../../lib/custom-element';
import { Color } from '../../types';
import styles from './alert.css';

export type Props = {
  append?: string;
  variant?: Color;
};

define<Props>('tw-alert', {
  props: {
    append: undefined,
    variant: 'neutral'
  },
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
  template: props => {
    const id = uuid();
    return /*html*/ `
      <link rel="stylesheet" href="/tailwind.css" />
      <div id="${id}" class="${classMap('alert', `alert-${props.variant}`, props.append)}" role="alert">
        <div class="text-sm"><slot></slot></div>
        <button 
          ref="close"
          type="button" 
          class="inline-flex items-center ml-2 -mr-2 p-0.5 h-8 w-8 alert-${props.variant}" 
          data-collapse-toggle="${id}"
          aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    `;
  }
});
