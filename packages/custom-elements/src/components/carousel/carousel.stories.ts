import { Meta, Story } from '@storybook/html';
import './carousel';
import './carousel-item';

export default {
  title: 'Components/Carousel',
  argTypes: {
    noButtons: {
      name: 'data-no-buttons',
      type: { name: 'boolean' }
    },
    noIndicators: {
      name: 'data-no-indicators',
      type: { name: 'boolean' }
    },
    timeout: {
      name: 'data-timeout',
      type: { name: 'number' }
    },
    textAlign: {
      name: 'data-text-align',
      type: { name: 'string' },
      control: { type: 'select' },
      options: ['left', 'center', 'right']
    },
    textPosition: {
      name: 'data-text-position',
      type: { name: 'string' },
      control: { type: 'select' },
      options: ['top', 'center', 'bottom']
    }
  }
} as Meta<any>;

const Template: Story<any & { text: any }> = ({ text, ...props }) => /*html*/ `
  <ui-carousel
    ${props.noIndicators ? 'data-no-indicators' : ''}
    ${props.noButtons ? 'data-no-buttons' : ''} 
    ${props.timeout ? `data-timeout="${props.timeout}"` : ''} 
  >
    <ui-carousel-item data-src="https://picsum.photos/id/400/800/300"
        ${props.textAlign ? `data-text-align="${props.textAlign}"` : ''}
        ${props.textPosition ? `data-text-position="${props.textPosition}"` : ''}>
      <h2 class="text-xl text-white">Campaign title</h2>
      <p class="text-xs text-white">Some representative placeholder content for the first slide</p>
    </ui-carousel-item>
    <ui-carousel-item data-src="https://picsum.photos/id/405/800/300"
        ${props.textAlign ? `data-text-align="${props.textAlign}"` : ''}
        ${props.textPosition ? `data-text-position="${props.textPosition}"` : ''}>
      <h2 class="text-xl text-white">Campaign title</h2>
      <p class="text-xs text-white">Some representative placeholder content for the first slide</p>
    </ui-carousel-item>
    <ui-carousel-item data-src="https://picsum.photos/id/402/800/300"
        ${props.textAlign ? `data-text-align="${props.textAlign}"` : ''}
        ${props.textPosition ? `data-text-position="${props.textPosition}"` : ''}>
      <h2 class="text-xl text-white">Campaign title</h2>
      <p class="text-xs text-white">Some representative placeholder content for the first slide</p>
    </ui-carousel-item>
    <ui-carousel-item data-src="https://picsum.photos/id/403/800/300"
        ${props.textAlign ? `data-text-align="${props.textAlign}"` : ''}
        ${props.textPosition ? `data-text-position="${props.textPosition}"` : ''}>
      <h2 class="text-xl text-white">Campaign title</h2>
      <p class="text-xs text-white">Some representative placeholder content for the first slide</p>
    </ui-carousel-item>
    <ui-carousel-item data-src="https://picsum.photos/id/404/800/300"
        ${props.textAlign ? `data-text-align="${props.textAlign}"` : ''}
        ${props.textPosition ? `data-text-position="${props.textPosition}"` : ''}>
      <h2 class="text-xl text-white">Campaign title</h2>
      <p class="text-xs text-white">Some representative placeholder content for the first slide</p>
    </ui-carousel-item>
  </ui-carousel>
`;

export const Basic = Template.bind({});
Basic.args = {
  noIndicators: false,
  noButtons: false,
  timeout: 8000,
  textAlign: 'center',
  textPosition: 'bottom'
};
