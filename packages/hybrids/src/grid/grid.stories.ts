import { Meta, Story } from '@storybook/html';
import type { GridProps } from './grid';

// import { define, html } from 'hybrids';

export default {
  title: 'Grid/Grid',
  args: {}
} as Meta;

const Template: Story<Partial<GridProps>> = (props: Partial<GridProps>) => {
  const el = document.createElement('div');
  el.className = 'not-prose relative rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-500/25';
  for (let key in props) {
    // @ts-ignore
    el[key] = props[key];
  }
  // language=HTML
  el.innerHTML = `
    <div class="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-gray-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
    <div class="relative rounded-xl overflow-auto p-8">
      <div class="grid grid-cols-4 gap-4 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg">
        ${[...Array(12)]
          .map(
            (_, idx) => `
        <div class="p-4 rounded-lg shadow-lg bg-fuchsia-500">${idx + 1}</div>`
          )
          .join('')}
      </div>
    </div>
    <div class="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
  `;
  return el;
};

export const Primary = Template.bind({});
Primary.args = {};
