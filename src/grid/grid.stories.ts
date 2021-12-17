import { Meta, Story } from '@storybook/html';
import type { ColumnsProps } from './grid';
import './grid';

export default {
  title: 'Columns/Columns',
  argTypes: {
    count: {
      name: 'count',
      type: { name: 'number', required: false },
      defaultValue: '0'
    }
  }
} as Meta;

const Template: Story<Partial<ColumnsProps>> = (props: Partial<ColumnsProps>) => {
  const el = document.createElement('wb-columns');
  for (let key in props) {
    // @ts-ignore
    el[key] = props[key];
  }
  return el;
};

export const Primary = Template.bind({});
Primary.args = {};
