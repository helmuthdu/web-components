import './button-group';
import './button';

export default {
  title: 'Elements/Button',
  decorators: [story => `<div class="canvas">${story()}</div>`]
};

export const Variants = {
  /*html*/
  render: () => `
      <ui-button>Get Started</ui-button>
      <ui-button data-variant="outline">Get Started</ui-button>
      <ui-button data-variant="text">Get Started</ui-button>`,

  name: 'Variants'
};

export const Colors = {
  /*html*/
  render: () => `
      <ui-button>Get Started</ui-button>
      <ui-button data-color="primary">Get Started</ui-button>
      <ui-button data-color="error">Get Started</ui-button>
      <ui-button data-color="success">Get Started</ui-button>`,

  name: 'Colors'
};

export const Size = {
  /*html*/
  render: () => `
      <ui-button data-size="xs">Get Started</ui-button>
      <ui-button data-size="sm">Get Started</ui-button>
      <ui-button data-size="md">Get Started</ui-button>
      <ui-button data-size="lg">Get Started</ui-button>
      <ui-button data-size="xl">Get Started</ui-button>`,

  name: 'Size'
};

export const Disabled = {
  /*html*/
  render: () => `
      <ui-button data-disabled>Get Started</ui-button>`,

  name: 'Disabled'
};

export const Loading = {
  /*html*/
  render: () => `
      <ui-button data-loading>Get Started</ui-button>`,

  name: 'Loading'
};

export const Circle = {
  /*html*/
  render: () => `
      <ui-button data-circle data-variant="outline">
        <svg style="height: 1.5rem; width: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
      </ui-button>`,

  name: 'Circle'
};

export const Group = {
  /*html*/
  render: () => `
      <ui-button-group>
        <ui-button>Get Started</ui-button>
        <ui-button data-variant="outline">Get Started</ui-button>
      </ui-button-group>`,

  name: 'Group'
};

export const Playground = {
  /*html*/
  render: ({ slot, ...props }) => `
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

  name: 'Playground',

  args: {
    slot: 'Get Started',
    color: 'primary',
    size: 'md',
    variant: undefined,
    block: false,
    circle: false,
    disabled: false,
    loading: false,
    rounded: false
  },

  argTypes: {
    slot: {
      type: {
        name: 'string',
        required: true
      },

      table: {
        category: 'slot'
      }
    },

    color: {
      name: 'data-color',

      control: {
        type: 'select'
      },

      options: ['default', 'primary', 'error', 'success'],

      table: {
        category: 'props'
      }
    },

    size: {
      name: 'data-size',

      type: {
        name: 'string'
      },

      control: {
        type: 'select'
      },

      options: ['xs', 'sm', 'md', 'lg', 'xl'],

      table: {
        category: 'props'
      }
    },

    variant: {
      name: 'data-variant',

      type: {
        name: 'string'
      },

      control: {
        type: 'select',

        labels: {
          [undefined]: 'default',
          outline: 'outline',
          text: 'text'
        }
      },

      options: [undefined, 'outline', 'text'],

      table: {
        category: 'props'
      }
    },

    block: {
      name: 'data-block',

      type: {
        name: 'boolean'
      },

      table: {
        category: 'props'
      }
    },

    circle: {
      name: 'data-circle',

      type: {
        name: 'boolean'
      },

      table: {
        category: 'props'
      }
    },

    disabled: {
      name: 'data-disabled',

      type: {
        name: 'boolean'
      },

      table: {
        category: 'props'
      }
    },

    loading: {
      name: 'data-loading',

      type: {
        name: 'boolean'
      },

      table: {
        category: 'props'
      }
    },

    rounded: {
      name: 'data-rounded',

      type: {
        name: 'boolean'
      },

      table: {
        category: 'props'
      }
    }
  }
};
