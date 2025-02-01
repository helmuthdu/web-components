import { define } from '../../utils/custom-element.util';
import style from './article.css?raw';

define('ui-article', {
  styles: [style],
  template: () => /* html */ `
    <div class="article">
      <div class="article__thumb"></div>
      <article class="article__content">
        <header class="article__title">
          <slot name="title"></slot>
        </header>
        <slot></slot>
        <footer class="article__desc">
          <slot name="description"></slot>
        </footer>
      </article>
    </div>
  `,
});
