import '../article';

export default {
  decorators: [(story) => `<div class="canvas">${story()}</div>`],
  title: 'Components/Article',
};

export const Playground = {
  args: {
    color: 'info',
    slot: /*html*/ `
      <img src="https://picsum.photos/id/229/800/300" alt="" slot="image" />
      <h2 class="font-medium" slot="header">Nulla ut consectetur aliquip nostrud est culpa id ut est.</h2>
      <span slot="meta">By John Doe</span> 
      Consequat non in quis ipsum ea. Consequat deserunt magna minim non occaecat ex ipsum velit. Proident ut pariatur labore qui laborum elit ex dolore ea officia consectetur ut magna excepteur nostrud. Veniam irure exercitation irure. Lorem dolor cillum pariatur ex culpa duis laboris quis nisi.
      <span slot="footer">Mollit qui ipsum nostrud est culpa id ut est exercitation mollit reprehenderit labore.</span>
    `,
  },

  name: 'Playground',

  render: ({ slot, ...props }) => /*html*/ `
    <ui-article ${props.color ? `data-color="${props.color}"` : ''} >
      ${slot}
    </ui-article>
  `,
};
