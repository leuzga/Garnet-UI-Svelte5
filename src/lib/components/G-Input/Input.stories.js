import Input from './Input.svelte';
import { fn } from '@storybook/test';

export default {
  title: 'Garnet UI Library/Basic Components/G-Input',
  component: Input,
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    label: 'Text:',
    placeholder: 'Enter your text here',
  },
};

export const Default = {
  render: (args) => ({
    Component: Input,
    props: args,
    on: {
      input: fn(),
    },
  }),
};

// Variante deshabilitada
export const Disabled = {
  render: (args) => ({
    Component: Input,
    props: args,
  }),
  args: {
    disabled: true,
  },
};

export const NoLabel = {
  render: (args) => ({
    Component: Input,
    props: args,
    on: {
      input: fn(),
    },
  }),
  args: {
    label: '',
    placeholder: 'Enter your text here',
  },
};
