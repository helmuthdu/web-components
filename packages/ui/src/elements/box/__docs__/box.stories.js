import '../box';

export default {
  decorators: [(story) => /*html*/ `<div class="canvas">${story()}</div>`],
  title: 'Components/Box',
};

export const Playground = {
  args: {
    slot: 'Get Started',
  },

  argTypes: {
    slot: {
      type: {
        name: 'string',
        required: true,
      },
    },
  },

  name: 'Playground',

  render: ({ slot, ...props }) => /*html*/ `
    <ui-box>
      ${slot}
    </ui-box>
  `,
};
