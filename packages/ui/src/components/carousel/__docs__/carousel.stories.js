import '../carousel';
import '../carousel-image';

export default {
  decorators: [(story) => /*html*/ `<div class="canvas">${story()}</div>`],
  title: 'Components/Carousel',
};

export const Playground = {
  args: {
    controls: true,
    navigation: true,
    textAlign: 'center',
    textPosition: 'bottom',
    timeout: 8000,
  },

  argTypes: {
    controls: {
      name: 'data-controls',
      type: {
        name: 'boolean',
      },
    },

    navigation: {
      name: 'data-navigation',
      type: {
        name: 'boolean',
      },
    },

    textAlign: {
      control: {
        type: 'select',
      },
      name: 'data-text-align',
      options: ['left', 'center', 'right'],
      type: {
        name: 'string',
      },
    },

    textPosition: {
      control: {
        type: 'select',
      },
      name: 'data-text-position',
      options: ['top', 'middle', 'bottom'],
      type: {
        name: 'string',
      },
    },

    timeout: {
      name: 'data-timeout',
      type: {
        name: 'number',
      },
    },
  },

  name: 'Playground',

  render: ({ slot, ...props }) => /*html*/ `
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
      ${props.navigation ? 'data-navigation' : ''}
      ${props.controls ? 'data-controls' : ''}
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
};
