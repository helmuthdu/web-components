import { Meta, Story } from '@storybook/html';
import './alert';
import type { DataSet } from './alert';

export default {
  title: 'Components/Alert',
  args: {
    variant: 'blue'
  }
} as Meta<DataSet>;

const Template: Story<Partial<DataSet>> = (_attrs: Partial<DataSet>) => {
  return /*html*/ `
    <tw-alert append="mb-4" variant="blue">
      <span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
    </tw-alert>
    <tw-alert append="mb-4" variant="red">
      <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
    </tw-alert>
    <tw-alert append="mb-4" variant="green">
      <span class="font-medium">Success alert!</span> Change a few things up and try submitting again.
    </tw-alert>
    <tw-alert append="mb-4" variant="amber">
      <span class="font-medium">Warning alert!</span> Change a few things up and try submitting again.
    </tw-alert>
    <tw-alert append="mb-4" variant="gray">
      <span class="font-medium">Dark alert!</span> Change a few things up and try submitting again.
    </tw-alert>
  `;
};

export const Primary = Template.bind({});
Primary.args = {};
