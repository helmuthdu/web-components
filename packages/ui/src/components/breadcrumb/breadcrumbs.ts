import { define } from '../../utils/custom-element.util';
import style from './breadcrumbs.css?raw';

type BreadcrumbsProps = {
  label?: string;
};

define<HTMLElement, BreadcrumbsProps>('ui-breadcrumbs', {
  observedAttributes: ['label'],
  styles: [style],
  template: (el) => /* html */ `
    <nav class="breadcrumbs" aria-label="${el.label || 'Breadcrumb'}">
      <div class="breadcrumbs-list" role="list">
        <slot></slot>
      </div>
    </nav>
  `,
});
