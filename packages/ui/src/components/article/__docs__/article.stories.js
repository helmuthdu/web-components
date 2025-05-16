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
      <p slot="text">
        Consequat non in quis ipsum ea. Consequat deserunt magna minim non occaecat ex ipsum velit. Proident ut pariatur labore qui laborum elit ex dolore ea officia consectetur ut magna excepteur nostrud. Veniam irure exercitation irure. Lorem dolor cillum pariatur ex culpa duis laboris quis nisi.
        <br /><br />
        Cupidatat deserunt sit veniam ad aute non laborum veniam occaecat. Consectetur non eiusmod tempor minim occaecat irure velit reprehenderit incididunt ullamco non pariatur aute et. Cupidatat laboris sit eiusmod minim exercitation ullamco reprehenderit. Est laborum aliqua esse laborum adipisicing dolor. Cupidatat eu exercitation ad.
        <br /><br />
        Eu in id veniam. Occaecat nisi eu consectetur minim sit ad. Amet do elit magna proident voluptate eiusmod ex fugiat veniam ex non. Dolor ut id est in fugiat adipisicing nulla mollit aliquip dolore enim aliquip. Exercitation aliqua cupidatat veniam culpa. Eu commodo ad magna occaecat elit enim id minim exercitation velit est reprehenderit nostrud dolore eu. Ad consequat nulla mollit officia sint cillum eiusmod consequat id et incididunt tempor. Non in eiusmod exercitation do.
      </p>
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
