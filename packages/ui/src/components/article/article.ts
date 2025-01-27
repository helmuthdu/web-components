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
  onAttributeChanged(name, prev, curr, el) {
    el.rootElement.className = getClassName(el);
  },
  template: () => /*html*/ `
    <style>
      .article {
        display: flex;
        flex-flow: column wrap;
        gap: var(--size-4);
      
        &-thumb {
          flex: 0 0 150px;
          aspect-ratio: 1/1;
          background-color: var(--color-canvas);
          border-radius: var(--rounded-md);
        }
      
        &-title {
          margin-block-end: var(--size-3);
          font-size: var(--text-lg);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-spacing-lg);
        }
      
        &-content {
          flex: 1;
        }
      
        @container (min-width: 400px) {
          & {
            flex-direction: row;
          }
      
          &-thumb {
            flex: 0 0 100px;
            align-self: flex-start;
          }
        }
      
        @container (min-width: 600px) {
          &-thumb {
            flex: 0 0 150px;
          }
        }
      
        @container (min-width: 800px) {
          & {
            position: relative;
            align-items: center;
            justify-content: center;
            min-block-size: 350px;
          }
      
          &-thumb {
            position: absolute;
            inset-block-start: 0;
            inset-inline-start: 0;
            inline-size: 100%;
            block-size: 100%;
            opacity: 0.25;
          }
      
          &-content {
            position: relative;
            flex: unset;
          }
      
          &-title {
            margin-block-end: 0.5rem;
            font-size: 1.5rem;
            font-weight: 700;
          }
      
          &-desc {
            max-inline-size: 480px;
            margin-inline: auto;
            color: #222;
            text-align: center;
          }
        }
      }
    </style>
    <div id="root" class="article">
      <div class="article__thumb"></div>
      <article class="article__content">
        <header class="article__title">
          <slot name="title" />
        </header>
        <slot />
        <footer class="article__desc">
          <slot name="description" />
        </footer>
      </article>
    </div>
  `
});
