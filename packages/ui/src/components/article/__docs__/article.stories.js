import '../article';

export default {
  decorators: [(story) => `<div class="canvas">${story()}</div>`],
  title: 'Components/Article',
};

export const Playground = {
  args: {
    color: 'info',
    slot: /*html*/ `<h2 class="font-medium" slot="title">Article!</h2> Change a few things up and try submitting again.`,
  },

  name: 'Playground',

  render: ({ slot, ...props }) => /*html*/ `
    <ui-article ${props.color ? `data-color="${props.color}"` : ''} >
      ${slot}
    </ui-article>
  `,
};
