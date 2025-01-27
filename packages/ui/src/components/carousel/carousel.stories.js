import './carousel';
import './carousel-image';

export default {
  title: 'Components/Carousel',
  decorators: [story => `<div class="canvas">${story()}</div>`]
};

export const Playground = {
  /*html*/
  render: ({ slot, ...props }) => `
        <style>
          .title {
            font-size: var(--text-xl);
            line-height: var(--line-spacing-xl);
            color: white;
          }
          .subtitle {
            font-size: var(--text-xs);
            line-height: var(--line-spacing-xs);
            color: white;
          }
        </style>
        <ui-carousel
          ${props.indicators ? 'data-indicators' : ''}
          ${props.buttons ? 'data-buttons' : ''}
          ${props.timeout ? `data-timeout="${props.timeout}"` : ''}>
          <ui-carousel-image data-src="https://picsum.photos/id/400/800/300"
            ${props.textAlign ? `data-text-align="${props.textAlign}"` : ''}
            ${props.textPosition ? `data-text-position="${props.textPosition}"` : ''}>
            <h2 class="title">Campaign title</h2>
            <p class="subtitle">Some representative placeholder content for the first slide</p>
          </ui-carousel-image>
          <ui-carousel-image data-src="https://picsum.photos/id/405/800/300"
              ${props.textAlign ? `data-text-align="${props.textAlign}"` : ''}
              ${props.textPosition ? `data-text-position="${props.textPosition}"` : ''}>
            <h2 class="title">Campaign title</h2>
            <p class="subtitle">Some representative placeholder content for the first slide</p>
          </ui-carousel-image>
          <ui-carousel-image data-src="https://picsum.photos/id/402/800/300"
              ${props.textAlign ? `data-text-align="${props.textAlign}"` : ''}
              ${props.textPosition ? `data-text-position="${props.textPosition}"` : ''}>
            <h2 class="title">Campaign title</h2>
            <p class="subtitle">Some representative placeholder content for the first slide</p>
          </ui-carousel-image>
          <ui-carousel-image data-src="https://picsum.photos/id/403/800/300"
              ${props.textAlign ? `data-text-align="${props.textAlign}"` : ''}
              ${props.textPosition ? `data-text-position="${props.textPosition}"` : ''}>
            <h2 class="title">Campaign title</h2>
            <p class="subtitle">Some representative placeholder content for the first slide</p>
          </ui-carousel-image>
          <ui-carousel-image data-src="https://picsum.photos/id/404/800/300"
              ${props.textAlign ? `data-text-align="${props.textAlign}"` : ''}
              ${props.textPosition ? `data-text-position="${props.textPosition}"` : ''}>
            <h2 class="title">Campaign title</h2>
            <p class="subtitle">Some representative placeholder content for the first slide</p>
          </ui-carousel-image>
        </ui-carousel>
    `,

  name: 'Playground',

  argTypes: {
    buttons: {
      name: 'data-buttons',

      type: {
        name: 'boolean'
      }
    },

    indicators: {
      name: 'data-indicators',

      type: {
        name: 'boolean'
      }
    },

    timeout: {
      name: 'data-timeout',

      type: {
        name: 'number'
      }
    },

    textAlign: {
      name: 'data-text-align',

      type: {
        name: 'string'
      },

      control: {
        type: 'select'
      },

      options: ['left', 'center', 'right']
    },

    textPosition: {
      name: 'data-text-position',

      type: {
        name: 'string'
      },

      control: {
        type: 'select'
      },

      options: ['top', 'middle', 'bottom']
    }
  },

  args: {
    indicators: true,
    buttons: true,
    timeout: 8000,
    textAlign: 'center',
    textPosition: 'bottom'
  }
};
