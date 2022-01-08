import { Meta, Story } from '@storybook/html';
import './accordion-group';
import type { DataSet } from './accordion-group';
import './accordion';

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
  <ce-accordion-group style="width: 300px" data-variant="${variant}">
    <ce-accordion data-header="1 item">
      <p>Laborum elit sint velit nulla aliqua sint anim id et adipisicing dolore.</p>
    </ce-accordion>
    <ce-accordion data-header="2 item">
      <p>Laborum elit sint velit nulla aliqua sint anim id et adipisicing dolore.</p>
    </ce-accordion>
    <ce-accordion data-header="3 item">
      <p>Laborum elit sint velit nulla aliqua sint anim id et adipisicing dolore.</p>
    </ce-accordion>
  </ce-accordion-group>
  `;
};

export const Primary = Template.bind({});
Primary.args = {};
