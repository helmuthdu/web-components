/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import { CloseButton } from '../../shared/close-button/close-button';

export type Props = {
  dataset: { append?: string; color?: 'error' | 'success' | 'info' | 'contrast' | undefined };
};

const getClassName = ({ dataset }: Props) =>
  classMap(
    'flex justify-between items-center py-2 pl-4 pr-3 text-sm border rounded-xl shadow-sm',
    !dataset.color
      ? 'text-content bg-canvas border-contrast-300'
      : {
          'text-primary-content bg-primary-backdrop border-primary-focus': dataset.color === 'info',
          'text-error-content bg-error-backdrop border-error-focus': dataset.color === 'error',
          'text-success-content bg-success-backdrop border-success-focus': dataset.color === 'success',
          'text-content-contrast bg-contrast-700 border-contrast-600': dataset.color === 'contrast'
        },
    dataset.append
  );

define<Props>('ui-alert', {
  props: {
    dataset: {
      append: undefined,
      color: undefined
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, spot }) {
    spot('root').className = getClassName({ dataset });
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
