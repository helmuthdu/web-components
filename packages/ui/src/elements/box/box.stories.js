import './box';

export default {
  title: 'Components/Box',
  decorators: [story => `<div class="canvas">${story()}</div>`]
};

export const Playground = {
  /*html*/
  render: ({ slot, ...props }) => `
      <ui-box>
        ${slot}
      </ui-box>
    `,

  name: 'Playground',

  argTypes: {
    slot: {
      type: {
        name: 'string',
        required: true
      }
    }
  },

  args: {
    slot: 'Get Started'
  }
};
