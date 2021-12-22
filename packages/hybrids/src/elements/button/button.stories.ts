import { Meta, Story } from '@storybook/html';
import type { ButtonProps } from './button';
import './button.wb';

export default {
  title: 'Elements/Button',
  args: {
    color: 'secondary',
    rounded: true
  }
} as Meta<ButtonProps>;

const Template: Story<Partial<ButtonProps>> = (props: Partial<ButtonProps>) => {
  const el = document.createElement('main');
  el.innerHTML = /*html*/ `
    <tw-button color="${props.color}">
      Get Started
    </tw-button>
  `;
  return el;
};

export const Primary = Template.bind({});
Primary.args = {};
