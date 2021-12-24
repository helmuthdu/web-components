import { Meta, Story } from '@storybook/html';
import type { Props } from './button';
import './button';

export default {
  title: 'Elements/Button',
  args: {
    variant: 'blue',
    rounded: true
  }
} as Meta<Props>;

const Template: Story<Partial<Props>> = (props: Partial<Props>) => {
  const el = document.createElement('container');
  el.innerHTML = /*html*/ `
    <tw-button variant="${props.variant}">
      Get Started
    </tw-button>
  `;
  return el;
};

export const Primary = Template.bind({});
Primary.args = {};
