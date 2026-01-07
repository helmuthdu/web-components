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
          warning: 'warning',
        },
        type: 'select',
      },
      name: 'color',
      options: [undefined, 'info', 'error', 'warning', 'success', 'contrast'],
      type: {
        name: 'string',
        required: true,
      },
    },
    pill: {
      name: 'pill',
      type: {
        name: 'boolean',
      },
    },
    size: {
      control: {
        type: 'select',
      },
      name: 'size',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
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
      size="${props.size}"
      ${props.color ? `color="${props.color}"` : ''}
      ${props.pill ? 'pill' : ''}>
        ${slot}
    </ui-badge>
  `,
};

export const Examples = {
  render: () => /*html*/ `
    <ui-badge>default</ui-badge>
    <ui-badge color="contrast">contrast</ui-badge>
    <ui-badge color="info">info</ui-badge>
    <ui-badge color="error">error</ui-badge>
    <ui-badge color="success">success</ui-badge>
  `,
};
