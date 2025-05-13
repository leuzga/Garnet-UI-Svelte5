import Checkbox from './Checkbox.svelte';
import CheckboxDecorator from './CheckboxDecorator.svelte';

export default {
  title: 'Garnet UI Library/Basic Components/G-Checkbox',
  component: Checkbox,
  // Modern decorator syntax for Storybook 8+
  decorators: [
    (story) => ({
      Component: CheckboxDecorator,
      slot: story,
    }),
  ],
  //decorators: [() => CheckboxDecorator],
  argTypes: {
    checked: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    oninput: { action: 'changed' },
  },
};

export const Default = {
  render: (args) => ({
    Component: Checkbox,
    props: args,
  }),
  args: {
    checked: true,
    label: 'This is a test',
  },
  play: async ({ canvasElement }) => {
    // You can add interaction testing here if needed
  },
};

export const Disabled = {
  render: (args) => ({
  Component: Checkbox,
  props: args,
  }),
  args: {
    checked: true,
    label: 'This is a test disabled checkbox',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    // You can add interaction testing here if needed
  },
};