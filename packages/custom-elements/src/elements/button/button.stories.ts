import { Meta, Story } from '@storybook/html';
import './button';
import './button-group';
import type { Props } from './button';

export default {
  title: 'Elements/Button',
  argTypes: {
    variant: {
      name: 'data-variant',
      type: { name: 'string', required: true },
      defaultValue: 'primary',
      control: { type: 'select' },
      options: ['primary', 'error', 'success']
    },
    size: {
      name: 'data-size',
      type: { name: 'string' },
      defaultValue: 'md',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    loading: {
      name: 'data-loading',
      type: { name: 'boolean' },
      defaultValue: false
    },
    outline: {
      name: 'data-outline',
      type: { name: 'boolean' },
      defaultValue: false
    },
    disabled: {
      name: 'data-disabled',
      type: { name: 'boolean' },
      defaultValue: false
    },
    block: {
      name: 'data-block',
      type: { name: 'boolean' },
      defaultValue: false
    },
    rounded: {
      name: 'data-rounded',
      type: { name: 'boolean' },
      defaultValue: false
    },
    circle: {
      name: 'data-circle',
      type: { name: 'boolean' },
      defaultValue: false
    }
  }
} as Meta<Props['dataset']>;

const Template: Story<Props['dataset'] & { disabled: boolean; text: any }> = ({ text, ...props }) => /*html*/ `
  <ui-button
    ${props.variant ? `data-variant="${props.variant}"` : ''}
    ${props.size ? `data-size="${props.size}"` : ''}
    ${props.disabled ? 'data-disabled' : ''}
    ${props.loading ? 'data-loading' : ''}
    ${props.outline ? 'data-outline' : ''}
    ${props.circle ? 'data-circle' : ''}
    ${props.rounded ? 'data-rounded' : ''}
    ${props.block ? 'data-block' : ''}
  >
    ${text}
  </ui-button>
`;

const TemplateGroup: Story<Props['dataset'] & { disabled: boolean; text: any }> = ({ text, ...props }) => /*html*/ `
  <ui-button-group>
    <ui-button
      ${props.variant ? `data-variant="${props.variant}"` : ''}
      ${props.size ? `data-size="${props.size}"` : ''}
      ${props.disabled ? 'data-disabled' : ''}
      ${props.loading ? 'data-loading' : ''}
      ${props.rounded ? 'data-rounded' : ''}
    >
      ${text}
    </ui-button>
    <ui-button
      ${props.variant ? `data-variant="${props.variant}"` : ''}
      data-outline
      ${props.size ? `data-size="${props.size}"` : ''}
      ${props.disabled ? 'data-disabled' : ''}
      ${props.rounded ? 'data-rounded' : ''}
    >
      ${text}
    </ui-button>
  </ui-button-group>
`;

export const Basic = Template.bind({});
Basic.args = {
  text: 'Get Started'
};

export const Circle = Template.bind({});
Circle.args = {
  circle: true,
  text: /*html*/ `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>`
};

export const Group = TemplateGroup.bind({});
Group.args = {
  text: 'Get Started'
};
