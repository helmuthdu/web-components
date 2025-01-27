import './article';

export default {
  title: 'Components/Article',
  decorators: [story => `<div class="canvas">${story()}</div>`]
};

export const Playground = {
  render: ({ slot, ...props }) => /*html*/ `
    <ui-article ${props.color ? `data-color="${props.color}"` : ''} >
      ${slot}
    </ui-article>
  `,

  name: 'Playground',

  args: {
    slot: /*html*/ `<h2 class="font-medium" slot="title">Article!</h2> Change a few things up and try submitting again.`,
    color: 'info'
  }
};
