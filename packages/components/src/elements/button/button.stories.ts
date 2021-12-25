import { Meta, Story } from '@storybook/html';
import type { Attributes } from './button';
import './button';

export default {
  title: 'Elements/Button',
  args: {
    variant: 'blue',
    rounded: true
  }
} as Meta<Attributes>;

const Template: Story<Partial<Attributes>> = (props: Partial<Attributes>) => {
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
