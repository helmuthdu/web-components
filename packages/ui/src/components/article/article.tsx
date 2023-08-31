/** @jsxRuntime classic */
/** @jsx dom */
/** @jsxFrag fragment */
import { dom, fragment } from '../../lib/create-element';
import { classMap, define } from '../../lib/custom-element';

export type Props = {
  dataset: { color?: 'error' | 'success' | 'info' | 'contrast' | undefined };
};

const getClassName = ({ dataset }: Props) =>
  classMap('article', {
    [`is-${dataset.color}`]: dataset.color
  });

define<Props>('ui-article', {
  props: {
    dataset: {
      color: undefined
    }
  },
  onAttributeChanged(name, prev, curr, { dataset, ref: spot }) {
    spot('host').className = getClassName({ dataset });
  },
  styles: [import('../../styles/styles.css'), import('./article.css')],
  template: ({ dataset, fire, remove }) => (
    <>
      <div className="card">
        <div className="card__thumb"></div>
        <article className="card__content">
          <header className="card__title">
            <slot name="title" />
          </header>
          <slot />
          <footer className="card__desc">
            <slot name="description" />
          </footer>
        </article>
      </div>
    </>
  )
});
