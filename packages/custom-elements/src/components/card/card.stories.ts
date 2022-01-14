import { Meta, Story } from '@storybook/html';
import './card';
import './card-body';
import './card-footer';
import './card-header';
import './card-image';
import './card-meta';
import './../../elements/button/button';
import '../badge/badge';
import type { DataSet } from './card';

export default {
  title: 'Components/Card',
  argTypes: {}
} as Meta<DataSet>;

const Template: Story<DataSet & { text: any }> = ({ text, ...props }) => /*html*/ `
  <ui-card ${props.horizontal ? 'data-horizontal' : ''}>
    <ui-card-image data-url="https://mdbootstrap.com/img/new/standard/nature/184.jpg"></ui-card-image>
    <ui-card-body>
      <ui-card-header>
        Card Header <ui-badge data-append="ml-1" data-variant="contrast" data-pill data-size="sm">new</ui-badge>
        <ui-card-meta>Last updated 3 mins ago</ui-card-meta>
      </ui-card-header>
        ${text}
      <ui-card-footer>
        <ui-button>Confirm</ui-button>
        <ui-button data-outline>Cancel</ui-button>
      </ui-card-footer>
    </ui-card-body>
  </ui-card>
`;

export const Basic = Template.bind({});
Basic.args = {
  text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
  horizontal: false
};
