/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import type { Sizes } from '../../types';

export type Props = {
  type?: 'button' | 'submit' | 'reset';
  dataset: {
    append?: string;
    block?: boolean;
    circle?: boolean;
    disabled?: boolean;
    group?: string;
    loading?: boolean;
    rounded?: boolean;
    size?: Sizes;
    color?: 'primary' | 'error' | 'success';
    variant?: 'outline' | 'text' | undefined;
  };
};

const LoadingIcon = ({ dataset }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const getClassName = ({ dataset }: Props) => {
  return classMap(
    'btn',
    {
      'is-block': dataset.block,
      'is-circle': dataset.circle,
      'is-disabled': dataset.disabled,
      'is-group': dataset.group,
      'is-first': dataset.group === 'first',
      'is-last': dataset.group === 'last',
      'is-loading': dataset.loading,
      'is-rounded': dataset.rounded,
      [`is-${dataset.color}`]: dataset.color,
      [`is-${dataset.size}`]: dataset.size,
      [`is-${dataset.variant}`]: dataset.variant
    },
    dataset.append
  );
};

define<Props>('ui-button', {
  props: {
    type: 'button',
    dataset: {
      append: undefined,
      block: undefined,
      circle: undefined,
      disabled: undefined,
      group: undefined,
      loading: undefined,
      rounded: undefined,
      size: undefined,
      color: undefined
    }
  },
  onAttributeChanged: (name, prev, curr, { classList, dataset, spot, render }) => {
    const root = spot<HTMLButtonElement>('root');
    switch (name) {
      case 'data-append':
      case 'data-circle':
      case 'data-color':
      case 'data-group':
      case 'data-rounded':
      case 'data-size':
      case 'data-variant':
        root.className = getClassName({ dataset });
        break;
      case 'data-loading':
        if (curr === null) {
          root.querySelector('svg')?.remove();
        } else {
          root.prepend((<LoadingIcon dataset={dataset} />) as any);
        }
        root.className = getClassName({ dataset });
        break;
      case 'data-disabled':
        root.disabled = curr !== null;
        root.className = getClassName({ dataset });
        break;
      case 'data-block':
        root.style.width = dataset.block ? '100%' : '';
        root.className = getClassName({ dataset });
        break;
      default:
        render();
    }
  },
  onConnected({ style, dataset }) {
    style.width = dataset.block ? '100%' : '';
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/theme.css'), import('./button.css')],
  template: ({ dataset, children, type }) => (
    <>
      <button id="root" type={type} className={getClassName({ dataset })} title={children[0]?.textContent ?? undefined}>
        {dataset.loading && <LoadingIcon dataset={dataset} />}
        <slot />
      </button>
    </>
  )
});
