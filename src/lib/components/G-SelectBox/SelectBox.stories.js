import SelectBox from './SelectBox.svelte';
import SelectBoxDecorator from './SelectBoxDecorator.svelte';

let optionValues = [
  { id: 1, value: 'aaa' },
  { id: 2, value: 'bbb' },
  { id: 3, value: 'ccc' },
  { id: 4, value: 'ddd' },
];

export default {
  title: 'Garnet UI Library/Action Components/G-SelectBox',
  component: SelectBox,
  decorators: [
    (story) => ({
      Component: SelectBoxDecorator,
      slot: story,
    }),
  ],
  argTypes: {
    selectOptions: { control: 'object', defaultValue: optionValues },
    displayText: { control: 'text' },
    label: { control: 'text' },
    change: { action: 'change' },
    oninput: { action: 'changed' },
    checked: { control: 'boolean' },
  },
};

export const Default = {
  render: (args) => ({
    Component: SelectBox,
    props: args,
    on: {
      change: (event) => {
        // Actualiza el mensaje en el DOM
        if (document.getElementById('message4')) {
          document.getElementById(
            'message4'
          ).innerHTML = `SelectBox value is ${JSON.stringify(
            event.detail.text.value
          )}`;
        }
        // Dispara la acción para que Storybook la muestre en el panel de Actions
        args.change(event);
      },
    },
  }),
  args: {
    selectOptions: optionValues,
    label: 'SelectBox',
    checked: false,
    disabled: false,
  },
};

export const WithLabel = {
  render: (args) => ({
    Component: SelectBox,
    props: args,
    on: {
      change: (event) => {
        if (document.getElementById('message4')) {
          document.getElementById(
            'message4'
          ).innerHTML = `SelectBox value is ${JSON.stringify(
            event.detail.text.value
          )}`;
        }
        args.change(event);
      },
    },
  }),
  args: {
    selectOptions: optionValues,
    label: 'This is a test',
    checked: false,
    disabled: false,
  },
};

export const Disabled = {
  render: (args) => ({
    Component: SelectBox,
    props: args,
  }),
  args: {
    selectOptions: optionValues,
    label: 'Disabled SelectBox',
    checked: true,
    disabled: true,
  },
};
