/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import style from './button-group.css';

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
  styles: [style],
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <div id="root" className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
