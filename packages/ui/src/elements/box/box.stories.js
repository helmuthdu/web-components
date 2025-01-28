import './box';

export default {
  title: 'Components/Box',
  decorators: [story => /*html*/ `<div class="canvas">${story()}</div>`]
};

export const Playground = {
  render: ({ slot, ...props }) => /*html*/ `
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
