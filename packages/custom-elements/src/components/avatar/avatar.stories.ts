import { Meta, Story } from '@storybook/html';
import './avatar';
import './avatar-group';
import type { DataSet } from './avatar-group';

export default {
  title: 'Components/Avatar'
} as Meta<DataSet>;

const Template: Story<Partial<DataSet>> = ({ variant }) => /*html*/ `
  <ce-avatar>
    <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png">
  </ce-avatar>
`;

export const Primary = Template.bind({});
Primary.args = {};
