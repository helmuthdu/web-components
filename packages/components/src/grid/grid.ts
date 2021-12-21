import { define, html } from 'hybrids';
import tailwind from '../style.css';

export type ColumnsProps = {};

export default define<ColumnsProps>({
  tag: 'tw-grid',
  render: props =>
    html`
      <div className="${props.className}">
        <slot />
      </div>
    `.style(tailwind)
});
