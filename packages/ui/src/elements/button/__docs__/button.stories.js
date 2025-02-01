import '../button-group';
import '../button';

export default {
  decorators: [(story) => /*html*/ `<div class="canvas">${story()}</div>`],
  title: 'Elements/Button',
};

export const Playground = {
  args: {
    block: false,
    circle: false,
    color: 'primary',
    disabled: false,
    loading: false,
    rounded: false,
    size: 'md',
    slot: 'Get Started',
    variant: undefined,
  },

  argTypes: {
    block: {
      name: 'data-block',
      table: {
        category: 'props',
      },
      type: {
        name: 'boolean',
      },
    },

    circle: {
      name: 'data-circle',
      table: {
        category: 'props',
      },
      type: {
        name: 'boolean',
      },
    },

    color: {
      control: {
        type: 'select',
      },
      name: 'data-color',
      options: ['default', 'primary', 'error', 'success'],
      table: {
        category: 'props',
      },
    },

    disabled: {
      name: 'data-disabled',
      table: {
        category: 'props',
      },
      type: {
        name: 'boolean',
      },
    },

    loading: {
      name: 'data-loading',
      table: {
        category: 'props',
      },
      type: {
        name: 'boolean',
      },
    },

    rounded: {
      name: 'data-rounded',
      table: {
        category: 'props',
      },
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
      table: {
        category: 'props',
      },
      type: {
        name: 'string',
      },
    },

    slot: {
      table: {
        category: 'slot',
      },
      type: {
        name: 'string',
        required: true,
      },
    },

    variant: {
      control: {
        labels: {
          outline: 'outline',
          text: 'text',
          [undefined]: 'default',
        },
        type: 'select',
      },
      name: 'data-variant',
      options: [undefined, 'outline', 'text'],
      table: {
        category: 'props',
      },
      type: {
        name: 'string',
      },
    },
  },

  name: 'Playground',

  render: ({ slot, ...props }) => /*html*/ `
    <ui-button
      ${props.color ? `data-color="${props.color}"` : ''}
      ${props.size ? `data-size="${props.size}"` : ''}
      ${props.variant ? `data-variant="${props.variant}"` : ''}
      ${props.disabled ? 'data-disabled' : ''}
      ${props.loading ? 'data-loading' : ''}
      ${props.circle ? 'data-circle' : ''}
      ${props.rounded ? 'data-rounded' : ''}
      ${props.block ? 'data-block' : ''}>
        ${slot}
    </ui-button>
  `,
};

export const Variants = {
  name: 'Variants',

  render: () => /*html*/ `
    <ui-button>Get Started</ui-button>
    <ui-button data-variant="outline">Get Started</ui-button>
    <ui-button data-variant="text">Get Started</ui-button>`,
};

export const Colors = {
  name: 'Colors',

  render: () => /*html*/ `
    <ui-button>Get Started</ui-button>
    <ui-button data-color="primary">Get Started</ui-button>
    <ui-button data-color="error">Get Started</ui-button>
    <ui-button data-color="success">Get Started</ui-button>`,
};

export const Size = {
  name: 'Size',

  render: () => /*html*/ `
    <ui-button data-size="xs">Get Started</ui-button>
    <ui-button data-size="sm">Get Started</ui-button>
    <ui-button data-size="md">Get Started</ui-button>
    <ui-button data-size="lg">Get Started</ui-button>
    <ui-button data-size="xl">Get Started</ui-button>`,
};

export const Disabled = {
  name: 'Disabled',

  render: () => /*html*/ `
    <ui-button data-disabled>Get Started</ui-button>`,
};

export const Loading = {
  name: 'Loading',

  render: () => /*html*/ `
    <ui-button data-loading>Get Started</ui-button>`,
};

export const Circle = {
  name: 'Circle',

  render: () => /*html*/ `
    <ui-button data-circle data-variant="outline">
      <svg style="height: 1.5rem; width: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
    </ui-button>`,
};

export const Group = {
  name: 'Group',

  render: () => /*html*/ `
    <ui-button-group>
      <ui-button>Get Started</ui-button>
      <ui-button data-variant="outline">Get Started</ui-button>
    </ui-button-group>`,
};
