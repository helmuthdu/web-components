import './alert';

export default {
  title: 'Components/Alert',
  decorators: [story => /*html*/ `<div class="canvas">${story()}</div>`]
};

export const Examples = {
  render: () => /*html*/ `
    <ui-alert>
      <span class="font-medium">Default alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>
    <ui-alert data-color="info">
      <span class="font-medium">Info alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>
    <ui-alert data-color="warning">
      <span class="font-medium">Danger alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>
    <ui-alert data-color="error">
      <span class="font-medium">Danger alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>
    <ui-alert data-color="success">
      <span class="font-medium">Success alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>
    <ui-alert data-color="contrast">
      <span class="font-medium">Warning alert!</span>
      Change a few things up and try submitting again.
    </ui-alert>`,

  name: 'Examples'
};

export const Playground = {
  render: ({ slot, ...props }) => /*html*/ `
    <ui-alert ${props.color ? `data-color="${props.color}"` : ''} >
      ${slot}
    </ui-alert>
  `,

  name: 'Playground',

  args: {
    slot: /*html*/ `<span class="font-medium">Alert!</span> Change a few things up and try submitting again.`,
    color: 'info'
  },

  argTypes: {
    color: {
      name: 'data-color',

      type: {
        name: 'string',
        required: true
      },

      control: {
        type: 'select',

        labels: {
          [undefined]: 'default',
          info: 'info',
          warning: 'warning',
          error: 'error',
          success: 'success',
          contrast: 'contrast'
        }
      },

      options: [undefined, 'info', 'error', 'success', 'contrast']
    }
  }
};
