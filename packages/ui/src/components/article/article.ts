import { define } from '../../utils/custom-element.util';
import style from './article.css?raw';

define('ui-article', {
  onConnected(el) {},
  styles: [style],
  template: () => /* html */ `
    <div class="layout">
      <div class="article">
        <div class="article-image">
          <slot name="image"></slot>
        </div>
        <article class="article-content">
          <header class="article-header">
            <slot name="header"></slot>
          </header>
          <slot name="meta"></slot>
          <slot name="text"></slot>
          <footer class="article-footer">
            <slot name="footer"></slot>
          </footer>
        </article>
      </div>
    </div>
  `,
});
