import '../alert';

export default {
  decorators: [(story) => /*html*/ `<div class="canvas">${story()}</div>`],
  title: 'Components/Alert',
};

export const Playground = {
  args: {
    color: 'info',
    slot: /*html*/ `<span class="font-medium">Alert!</span> Change a few things up and try submitting again.`,
  },

  argTypes: {
    color: {
      control: {
        labels: {
          contrast: 'contrast',
          error: 'error',
          info: 'info',
          success: 'success',
          [undefined]: 'default',
          warning: 'warning',
        },
        type: 'select',
      },
      name: 'color',
      options: [undefined, 'info', 'error', 'success', 'contrast'],
      type: {
        name: 'string',
        required: true,
      },
    },
  },

  name: 'Playground',

  render: ({ slot, ...props }) => /*html*/ `
    <ui-alert ${props.color ? `color="${props.color}"` : ''} >
      ${slot}
    </ui-alert>
  `,
};

export const Examples = {
  name: 'Examples',

  render: () => /*html*/ `
    <ui-alert>
      <span class="font-medium">Default alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>
    <ui-alert color="info">
      <span class="font-medium">Info alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>
    <ui-alert color="warning">
      <span class="font-medium">Danger alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>
    <ui-alert color="error">
      <span class="font-medium">Danger alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>
    <ui-alert color="success">
      <span class="font-medium">Success alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>
    <ui-alert color="contrast">
      <span class="font-medium">Warning alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>`,
};
