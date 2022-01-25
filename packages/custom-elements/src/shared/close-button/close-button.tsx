/** @jsx dom */
import { dom } from '../../lib/create-element';
import { classMap } from '../../lib/styling-element';

type Props = { className?: string; onClick: () => void };

export const CloseButton = (props: Props) => (
  <button
    id="close-button"
    type="button"
    className={classMap(
      'ml-1 -mr-1 inline-flex h-8 w-8 items-center justify-center p-0.5 text-current',
      props.className
    )}
    onClick={props.onClick}>
    <span className="sr-only">close</span>
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
);
