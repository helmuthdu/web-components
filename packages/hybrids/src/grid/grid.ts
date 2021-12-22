import { define, html } from 'hybrids';
import tailwind from '../../tailwind.css';

export type GridProps = {};

export default define<GridProps>({
  tag: 'tw-grid',
  render: props =>
    html`
      <div className="${props.className}">
        <slot />
      </div>
    `.style(tailwind)
});
