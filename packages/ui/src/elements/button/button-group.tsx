/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: {
    append?: string;
  };
};

const getClassName = ({ dataset }: Props) => classMap('button-group', dataset.append);

define<Props>('ui-button-group', {
  props: {
    dataset: {
      append: undefined
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, spot }) {
    spot('root').className = getClassName({ dataset });
  },
  onConnected({ children }) {
    for (let idx = 0; idx < (children ?? []).length; idx++) {
      children[idx].setAttribute('data-group', idx === 0 ? 'first' : idx === children.length - 1 ? 'last' : '');
    }
  },
  styles: [import('../../styles/preflight.css'), import('../../styles/variables.css'), import('./button-group.css')],
  template: ({ dataset }) => (
    <>
      <div id="root" className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
