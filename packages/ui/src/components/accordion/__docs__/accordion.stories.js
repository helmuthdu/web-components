import '../accordion-item';
import '../accordion';

export default {
  decorators: [(story) => /*html*/ `<div class="canvas">${story()}</div>`],
  title: 'Components/Accordion',
};

export const Playground = {
  args: {
    variant: 'primary',
  },

  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      name: 'variant',
      options: ['primary', 'secondary', 'tertiary'],
      type: {
        name: 'string',
        required: true,
      },
    },
  },

  name: 'Playground',

  render: ({ variant }) => /*html*/ `
    <style>
      .wrapper {
        width: var(--size-96);
      }
    </style>
    <ui-accordion class="wrapper" variant="${variant}">
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
};
