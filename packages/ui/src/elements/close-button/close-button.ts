import { classMap } from '../../utils/styling-element.util';
import { define } from '../../utils/custom-element.util';

export type Props = { dataset: { append?: string } };

define<Props, HTMLButtonElement>('ui-close-button', {
  props: {
    dataset: {
      append: undefined
    }
  },
  template: ctx => /*html*/ `
    <style>
      .close-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: var(--size-8);
        block-size: var(--size-8);
        padding: var(--size-1);
        margin-inline: calc(var(--size-1) - var(--size-1));
        color: currentcolor;
        cursor: pointer;
        background-color: transparent;
        border: none;
      }
      
      .close-button > span {
        position: absolute;
        inline-size: 1px;
        block-size: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
      
      .close-button > svg {
        inline-size: var(--size-5);
        block-size: var(--size-5);
      }
    </style>
    <button aria-label="close" id="close-button" type="button" class="${classMap('close-button', ctx.dataset.append)}">
      <span>close</span>
      <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  `
});
