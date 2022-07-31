/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap } from '../../lib/styling-element';
import { define } from '../../lib/custom-element';
import styles from './close-button.css';

export type Props = { dataset: { append?: string } };

define<Props>('ui-close-button', {
  props: {
    dataset: {
      append: undefined
    }
  },
  styles: [styles],
  template: ({ dataset }) => (
    <>
      <button id="close-button" type="button" className={classMap('close-button', dataset.append)}>
        <span>close</span>
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </>
  )
});
