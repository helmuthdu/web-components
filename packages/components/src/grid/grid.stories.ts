import { Meta, Story } from '@storybook/html';
import type { ColumnsProps } from './grid';
import './grid';
import { define, html } from 'hybrids';

export default {
  title: 'Grid/Grid',
  args: {}
} as Meta;

const Template: Story<Partial<ColumnsProps>> = () => {
  define({
    tag: 'storybook-view',
    content: () => html`
      <div class="container">
        <tw-grid class="grid grid-cols-4 grid-flow-row auto-rows-max gap-1">
          ${[...Array(10)].map(
            (_, idx) =>
              html`
                <div class="bg-slate-500">${idx}</div>
              `
          )}
        </tw-grid>
      </div>
    `
  });
  return document.createElement('storybook-view');
};

export const Primary = Template.bind({});
Primary.args = {};
