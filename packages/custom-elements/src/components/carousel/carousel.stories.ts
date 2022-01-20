import { Meta, Story } from '@storybook/html';
import './carousel';
import './carousel-item';
import type { Props } from './carousel-item';

export default {
  title: 'Components/Carousel',
  argTypes: {}
} as Meta<Props['dataset']>;

const Template: Story<Props['dataset'] & { text: any }> = ({ text, ...props }) => /*html*/ `
  <ui-carousel>
    <ui-carousel-item data-src="https://picsum.photos/id/400/800/400">
      <h2 class="text-xl text-white">Campaign title</h2>
      <p class="text-xs text-white">Some representative placeholder content for the first slide</p>
    </ui-carousel-item>
    <ui-carousel-item data-src="https://picsum.photos/id/405/800/400">
      <h2 class="text-xl text-white">Campaign title</h2>
      <p class="text-xs text-white">Some representative placeholder content for the first slide</p>
    </ui-carousel-item>
    <ui-carousel-item data-src="https://picsum.photos/id/402/800/400">
      <h2 class="text-xl text-white">Campaign title</h2>
      <p class="text-xs text-white">Some representative placeholder content for the first slide</p>
    </ui-carousel-item>
    <ui-carousel-item data-src="https://picsum.photos/id/403/800/400">
      <h2 class="text-xl text-white">Campaign title</h2>
      <p class="text-xs text-white">Some representative placeholder content for the first slide</p>
    </ui-carousel-item>
    <ui-carousel-item data-src="https://picsum.photos/id/404/800/400">
      <h2 class="text-xl text-white">Campaign title</h2>
      <p class="text-xs text-white">Some representative placeholder content for the first slide</p>
    </ui-carousel-item>
  </ui-carousel>
`;

export const Basic = Template.bind({});
Basic.args = {};
