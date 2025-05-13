import RadioButton from './RadioButton.svelte';
import { action } from '@storybook/addon-actions';

let selectOptions = [
  {
    value: 'Armstrong-Siddeley',
    label: 'Armstrong-Siddeley',
  },
  {
    value: 'Jaguar Mark II',
    label: 'Jaguar Mark II',
  },
  {
    value: 'Ford Zephyr',
    label: 'Ford Zephyr',
  },
];

// Formato de metadatos para Storybook v8
export default {
  title: 'Garnet UI Library/Basic Components/G-RadioButton',
  component: RadioButton,
  argTypes: {
    disabled: { control: 'boolean' },
    options: { control: 'object' },
    onChange: { action: 'changed' },
  },
  // Configuración de acciones global
  parameters: {
    actions: {
      handles: ['change'],
    },
  },
};

// Formato de historias para Storybook v8
export const Default = {
  args: {
    selectOptions,
  },
  // El método render reemplaza la función de componente en Storybook v8
  render: (args) => ({
    Component: RadioButton,
    props: args,
    on: {
      change: action('on-change'),
    },
  }),
};

export const Disabled = {
  args: {
    selectOptions,
    disabled: true,
  },
  render: (args) => ({
    Component: RadioButton,
    props: args,
    on: {
      change: action('on-change'),
    },
  }),
};
