import './accordion-item';
import './accordion';

export default {
  title: 'Components/Accordion',
  decorators: [story => /*html*/ `<div class="canvas">${story()}</div>`]
};

export const Playground = {
  render: ({ variant }) => /*html*/ `
      <style>
         .wrapper {
           width: var(--size-96);
         }
      </style>
      <ui-accordion class="wrapper" data-variant="${variant}">
        <ui-accordion-item>
          <h2 slot="header">1 item</h2>
          <p>Laborum elit sint velit nulla aliqua sint anim id et adipisicing dolore.</p>
        </ui-accordion-item>
        <ui-accordion-item>
          <h2 slot="header">2 item</h2>
          <p>Laborum elit sint velit nulla aliqua sint anim id et adipisicing dolore.</p>
        </ui-accordion-item>
        <ui-accordion-item>
          <h2 slot="header">3 item</h2>
          <p>Laborum elit sint velit nulla aliqua sint anim id et adipisicing dolore.</p>
        </ui-accordion-item>
      </ui-accordion>
    `,

  name: 'Playground',

  argTypes: {
    variant: {
      name: 'variant',

      type: {
        name: 'string',
        required: true
      },

      control: {
        type: 'select'
      },

      options: ['primary', 'secondary', 'tertiary']
    }
  },

  args: {
    variant: 'primary'
  }
};
