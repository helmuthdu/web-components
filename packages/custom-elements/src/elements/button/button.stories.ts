import { Meta, Story } from '@storybook/html';
import './button';
import type { DataSet } from './button';

export default {
  title: 'Elements/Button',
  argTypes: {
    variant: {
      name: 'variant',
      type: { name: 'string', required: true },
      defaultValue: 'blue',
      control: { type: 'select' },
      options: [
        'slate',
        'gray',
        'zinc',
        'neutral',
        'stone',
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose'
      ]
    },
    size: {
      name: 'size',
      type: { name: 'string' },
      defaultValue: 'md',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    loading: {
      name: 'loading',
      type: { name: 'boolean' },
      defaultValue: false
    },
    outline: {
      name: 'outline',
      type: { name: 'boolean' },
      defaultValue: false
    },
    disabled: {
      name: 'disabled',
      type: { name: 'boolean' },
      defaultValue: false
    }
  }
} as Meta<DataSet>;

const Template: Story<DataSet & { text: any }> = ({ text, ...props }) =>
  `
    <tw-button
      variant="${props.variant}"
      size="${props.size}"
      ${props.loading ? 'loading' : ''}
      ${props.outline ? 'outline' : ''}
      ${props.disabled ? 'disabled' : ''}
      ${props.circle ? 'circle' : ''}
      ${props.rounded ? 'rounded' : ''}
      ${props.block ? 'block' : ''}
    >
      ${text}
    </tw-button>
  `;

export const Basic = Template.bind({});
Basic.args = {
  text: 'Get Started',
  block: false,
  rounded: false,
  circle: false
};

export const Circle = Template.bind({});
Circle.args = {
  circle: true,
  text: /*html*/ `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>`
};
