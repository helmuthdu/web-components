import { Meta, Story } from '@storybook/html';
import './toast';
import type { Props } from './toast';

export default {
  title: 'Components/Toast',
  argTypes: {
    variant: {
      name: 'data-variant',
      type: { name: 'string', required: true },
      defaultValue: 'info',
      control: { type: 'select' },
      options: ['info', 'error', 'success', 'contrast']
    }
  }
} as Meta<Props['dataset']>;

const Template: Story<Props['dataset'] & { text: any }> = ({ text, ...props }) => /*html*/ `
  <ui-toast
    data-variant="${props.variant}">
    ${text}
  </ui-toast>
`;

export const Basic = Template.bind({});
Basic.args = {
  text: 'Get Started'
};
