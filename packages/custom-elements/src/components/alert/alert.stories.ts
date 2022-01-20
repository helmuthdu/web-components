import { Meta, Story } from '@storybook/html';
import './alert';
import type { Props } from './alert';

export default {
  title: 'Components/Alert',
  argTypes: {
    variant: {
      name: 'data-variant',
      type: { name: 'string' },
      defaultValue: false,
      control: { type: 'select' },
      options: [false, 'info', 'error', 'success', 'contrast']
    }
  }
} as Meta<Props['dataset']>;

const Template: Story<Partial<Props['dataset']>> = props => /*html*/ `
  <ui-alert data-append="mb-4" ${props.variant ? `data-variant="${props.variant}"` : ''} >
    <span class="font-medium">Alert!</span> Change a few things up and try submitting again.
  </ui-alert>
`;

export const Primary = Template.bind({});
Primary.args = {};
