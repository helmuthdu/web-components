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
      name: 'data-horizontal',
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
    <ui-card ${props.horizontal ? 'data-horizontal' : ''}>
      <ui-card-image data-src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"></ui-card-image>
      <ui-card-body>
        <ui-card-header>
          Card Header <ui-badge data-variant="contrast" data-pill data-size="sm">new</ui-badge>
          <ui-card-meta>Last updated 3 mins ago</ui-card-meta>
        </ui-card-header>
        ${slot}
        <ui-card-footer>
          <ui-button>Confirm</ui-button>
          <ui-button data-variant="outline">Cancel</ui-button>
        </ui-card-footer>
      </ui-card-body>
    </ui-card>
  `,
};
