import './badge';

export default {
  title: 'Components/Badges',
  decorators: [story => /*html*/ `<div class="canvas" style="flex-direction: row">${story()}</div>`]
};

export const Examples = {
  render: () => /*html*/ `
    <ui-badge>default</ui-badge>
    <ui-badge data-color="contrast">contrast</ui-badge>
    <ui-badge data-color="info">info</ui-badge>
    <ui-badge data-color="error">error</ui-badge>
    <ui-badge data-color="success">success</ui-badge>
  `
};

export const Playground = {
  render: ({ slot, ...props }) => /*html*/ `
    <ui-badge
      data-size="${props.size}"
      ${props.color ? `data-color="${props.color}"` : ''}
      ${props.pill ? 'data-pill' : ''}>
        ${slot}
    </ui-badge>
  `,

  name: 'Playground',

  argTypes: {
    slot: {
      type: {
        name: 'string',
        required: true
      }
    },

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
          error: 'error',
          success: 'success',
          contrast: 'contrast'
        }
      },

      options: [undefined, 'info', 'error', 'success', 'contrast']
    },

    size: {
      name: 'data-size',

      type: {
        name: 'string'
      },

      control: {
        type: 'select'
      },

      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },

    pill: {
      name: 'data-pill',

      type: {
        name: 'boolean'
      }
    }
  },

  args: {
    slot: 'Get Started',
    pill: true,
    size: 'md',
    color: undefined
  }
};
