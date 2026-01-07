import '../card';
import '../card-body';
import '../card-footer';
import '../card-header';
import '../card-image';
import '../card-meta';
import '../../../elements/button/button';
import '../../badge/badge';

export default {
  decorators: [(story) => /*html*/ `<div class="canvas">${story()}</div>`],
  title: 'Components/Card',
};

export const Playground = {
  args: {
    horizontal: false,
    slot: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
  },

  argTypes: {
    horizontal: {
      name: 'horizontal',
      type: {
        name: 'boolean',
      },
    },
    slot: {
      type: {
        name: 'string',
        required: true,
      },
    },
  },

  name: 'Playground',

  render: ({ slot, ...props }) => /*html*/ `
    <ui-card ${props.horizontal ? 'horizontal' : ''}>
      <ui-card-image src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"></ui-card-image>
      <ui-card-body>
        <ui-card-header>
          Card Header <ui-badge variant="contrast" pill size="sm">new</ui-badge>
          <ui-card-meta>Last updated 3 mins ago</ui-card-meta>
        </ui-card-header>
        ${slot}
        <ui-card-footer>
          <ui-button>Confirm</ui-button>
          <ui-button variant="outline">Cancel</ui-button>
        </ui-card-footer>
      </ui-card-body>
    </ui-card>
  `,
};
