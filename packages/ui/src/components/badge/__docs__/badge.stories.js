import '../badge';

export default {
  decorators: [(story) => /*html*/ `<div class="canvas" style="flex-direction: row">${story()}</div>`],
  title: 'Components/Badges',
};

export const Playground = {
  args: {
    color: undefined,
    pill: true,
    size: 'md',
    slot: 'Get Started',
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
        },
        type: 'select',
      },
      name: 'data-color',
      options: [undefined, 'info', 'error', 'success', 'contrast'],
      type: {
        name: 'string',
        required: true,
      },
    },
    pill: {
      name: 'data-pill',
      type: {
        name: 'boolean',
      },
    },
    size: {
      control: {
        type: 'select',
      },
      name: 'data-size',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      type: {
        name: 'string',
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
    <ui-badge
      data-size="${props.size}"
      ${props.color ? `data-color="${props.color}"` : ''}
      ${props.pill ? 'data-pill' : ''}>
        ${slot}
    </ui-badge>
  `,
};

export const Examples = {
  render: () => /*html*/ `
    <ui-badge>default</ui-badge>
    <ui-badge data-color="contrast">contrast</ui-badge>
    <ui-badge data-color="info">info</ui-badge>
    <ui-badge data-color="error">error</ui-badge>
    <ui-badge data-color="success">success</ui-badge>
  `,
};
