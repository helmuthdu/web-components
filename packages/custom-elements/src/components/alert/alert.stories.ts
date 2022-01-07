import { Meta, Story } from '@storybook/html';
import './alert';
import type { DataSet } from './alert';

export default {
  title: 'Components/Alert',
  args: {
    variant: 'info'
  }
} as Meta<DataSet>;

const Template: Story<Partial<DataSet>> = (_attrs: Partial<DataSet>) => {
  return /*html*/ `
    <tw-alert data-append="mb-4">
      <span class="font-medium">Default alert!</span> Change a few things up and try submitting again.
    </tw-alert>
    <tw-alert data-append="mb-4" data-variant="info">
      <span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
    </tw-alert>
    <tw-alert data-append="mb-4" data-variant="error">
      <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
    </tw-alert>
    <tw-alert data-append="mb-4" data-variant="success">
      <span class="font-medium">Success alert!</span> Change a few things up and try submitting again.
    </tw-alert>
    <tw-alert data-append="mb-4" data-variant="contrast">
      <span class="font-medium">Contrast alert!</span> Change a few things up and try submitting again.
    </tw-alert>
  `;
};

export const Primary = Template.bind({});
Primary.args = {};
