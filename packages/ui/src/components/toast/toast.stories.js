import './toast';

const truncate = (text, size = 127) => text.slice(0, size) + (text.length > size ? '…' : '');

export default {
  title: 'Components/Toast',

  decorators: [story => /*html*/ `<div class="canvas" style="flex-direction: column;">${story()}</div>`]
};

export const Examples = {
  render: () => /*html*/ `
      <ui-toast data-fixed>
        <i slot="icon">
          <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </i>
        <header slot="header">My Notification</header>
        <span slot="meta">10 minutes ago</span>
        Excepteur est ullamco do sit culpa laboris.
      </ui-toast>
      <ui-toast data-color="contrast" data-fixed>
        <i slot="icon">
          <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </i>
        <header slot="header">My Notification</header>
        Excepteur est ullamco do sit culpa laboris.
      </ui-toast>
      <ui-toast data-color="info">
        <i slot="icon">
          <svg style="width: 2rem; height: 2rem; flex: none;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </i>
        ${truncate('Ut minim voluptate ea laboris velit duis exercitation sit minim ex magna commodo id.', 78)}
      </ui-toast>
      <ui-toast data-color="success">
        <i slot="icon">
          <svg style="width: 2rem; height: 2rem; flex: none;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </i>
        Consectetur mollit exercitation duis consectetur pariatur cupidatat consequat.
      </ui-toast>
      <ui-toast data-color="error">
        <i slot="icon">
          <svg style="width: 2rem; height: 2rem; flex: none;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </i>
        Duis amet cupidatat voluptate dolore nostrud ad fugiat reprehenderit.
      </ui-toast>`,

  name: 'Examples'
};

export const Playground = {
  render: ({ slot, ...props }) => /*html*/ `
    <ui-toast ${props.color ? `data-color="${props.color}"` : ''} data-fixed>
      ${slot}
    </ui-toast>
  `,

  name: 'Playground',

  /*html*/
  args: {
    slot: /*html*/ `<header slot="header">My Notification</header><span slot="meta">10 minutes ago</span>Excepteur est ullamco do sit culpa laboris.`,
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
          error: 'error',
          success: 'success',
          contrast: 'contrast'
        }
      },

      options: [undefined, 'info', 'error', 'success', 'contrast']
    }
  }
};
