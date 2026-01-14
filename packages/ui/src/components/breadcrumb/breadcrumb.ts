import { define } from '../../utils/custom-element.util';
import style from './breadcrumb.css?raw';

type BreadcrumbProps = {
  href?: string;
};

define<HTMLElement, BreadcrumbProps>('ui-breadcrumb', {
  observedAttributes: ['href'],
  styles: [style],
  template: (el) => /* html */ `
    <div class="breadcrumb-item" role="listitem">
      ${
        el.href
          ? `<a href="${el.href}" class="breadcrumb-link"><slot></slot></a>`
          : `<span class="breadcrumb-text" aria-current="page"><slot></slot></span>`
      }
      <span class="breadcrumb-separator" aria-hidden="true">
        <slot name="separator">/</slot>
      </span>
    </div>
  `,
});
