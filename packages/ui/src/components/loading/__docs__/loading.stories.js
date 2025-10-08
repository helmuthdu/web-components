import '../loading';

export default {
  decorators: [(story) => /*html*/ `<div class="canvas">${story()}</div>`],
  title: 'Components/Loading',
};

export const Playground = {
  name: 'Playground',

  render: ({ slot, ...props }) => /*html*/ `
    <ui-loading/>
  `,
};
