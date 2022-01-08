import { Meta, Story } from '@storybook/html';
import './accordion';
import type { DataSet } from './accordion';
import './accordion-item';

export default {
  title: 'Components/Accordion',
  argTypes: {
    variant: {
      name: 'variant',
      type: { name: 'string', required: true },
      defaultValue: 'solid',
      control: { type: 'select' },
      options: ['transparent', 'solid', 'filled']
    }
  }
} as Meta<DataSet>;

const Template: Story<Partial<DataSet>> = ({ variant }) => {
  return /*html*/ `
  <tw-accordion style="width: 300px" data-variant="${variant}">
    <tw-accordion-item data-header="1 item">
      <p>Laborum elit sint velit nulla aliqua sint anim id et adipisicing dolore.</p>
    </tw-accordion-item>
    <tw-accordion-item data-header="2 item">
      <p>Laborum elit sint velit nulla aliqua sint anim id et adipisicing dolore.</p>
    </tw-accordion-item>
    <tw-accordion-item data-header="3 item">
      <p>Laborum elit sint velit nulla aliqua sint anim id et adipisicing dolore.</p>
    </tw-accordion-item>
  </tw-accordion>
  `;
};

export const Primary = Template.bind({});
Primary.args = {};
