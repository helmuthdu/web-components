/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import { CloseButton } from '../../shared/close-button/close-button';

export type Props = {
  dataset: { append?: string; variant?: 'error' | 'success' | 'info' | 'contrast' | undefined };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'flex justify-between items-center py-2 pl-4 pr-3 text-sm border rounded-xl shadow-sm',
    !dataset.variant
      ? 'text-content bg-canvas border-contrast-300'
      : {
          'text-primary-content bg-primary-backdrop border-primary-focus': dataset.variant === 'info',
          'text-error-content bg-error-backdrop border-error-focus': dataset.variant === 'error',
          'text-success-content bg-success-backdrop border-success-focus': dataset.variant === 'success',
          'text-content-contrast bg-contrast-700 border-contrast-600': dataset.variant === 'contrast'
        },
    dataset.append
  );

define<Props>('ui-alert', {
  props: {
    dataset: {
      append: undefined,
      variant: undefined
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, root }) {
    root.className = getClassName({ dataset });
  },
  template: ({ dataset, fire, remove }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <div id="root" className={getClassName({ dataset })}>
        <span className="text-sm">
          <slot />
        </span>
        <CloseButton
          onClick={() => {
            fire('close');
            remove();
          }}
        />
      </div>
    </>
  )
});
