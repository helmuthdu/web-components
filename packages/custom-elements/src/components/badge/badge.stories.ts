import { Meta, Story } from '@storybook/html';
import './badge';
import type { DataSet } from './badge';

export default {
  title: 'Elements/Badge',
  argTypes: {
    variant: {
      name: 'variant',
      type: { name: 'string', required: true },
      defaultValue: 'info',
      control: { type: 'select' },
      options: ['info', 'error', 'success', 'contrast']
    },
    size: {
      name: 'size',
      type: { name: 'string' },
      defaultValue: 'md',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    }
  }
} as Meta<DataSet>;

const Template: Story<DataSet & { text: any }> = ({ text, ...props }) => /*html*/ `
  <ce-badge
    data-size="${props.size}"
    data-variant="${props.variant}"
    ${props.pill ? 'data-pill' : ''}>
    ${text}
  </ce-badge>
`;

export const Basic = Template.bind({});
Basic.args = {
  text: 'Get Started',
  pill: false
};
