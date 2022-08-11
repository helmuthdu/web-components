/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';
import styles from './box.css';

export type Props = {
  dataset: {
    append?: string;
  };
};

const getClassName = ({ dataset }: Props) => classMap('box', dataset.append);

define<Props>('ui-box', {
  props: {
    dataset: {
      append: undefined
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, spot }) {
    spot('root').className = getClassName({ dataset });
  },
  styles: [styles],
  template: ({ dataset }) => (
    <>
      <link rel="stylesheet" href="/tailwind.css" />
      <div id="root" className={getClassName({ dataset })}>
        <slot />
      </div>
    </>
  )
});
