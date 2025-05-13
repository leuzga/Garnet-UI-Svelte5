// @ts-nocheck
import Chip from './Chip.svelte';

// Definición del meta
export default {
  title: 'Garnet UI Library/Navigation Components/Chip',
  component: Chip,
  argTypes: {
    // Propiedades del componente
    active: {
      control: 'boolean',
      description: 'Controls whether the chip is displayed',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    close: {
      control: 'boolean',
      description: 'Controls whether to show close button',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    chipContent: {
      control: 'text',
      description: 'The content text for the chip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Controls whether the chip appears selected',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    outline: {
      control: 'boolean',
      description: 'Controls whether to show outline style',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onclose: {
      action: 'onclose',
      description: 'Callback when close button is clicked',
      table: {
        type: { summary: 'function' },
      },
    },
    // Nuevas propiedades para el icono
    iconFamily: {
      control: 'text',
      description: 'Icon family (e.g., "icon-park-solid")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    iconName: {
      control: 'text',
      description: 'Icon name (e.g., "beer-mug")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    iconSize: {
      control: 'text',
      description: 'Icon size',
      defaultValue: '1em',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"1em"' },
      },
    },
  },
};

// Definición de la historia principal usando el formato CSF3
export const Default = {
  render: (args) => ({
    Component: Chip,
    props: args,
  }),
  args: {
    // Valores predeterminados para mostrar el componente
    active: true,
    close: false,
    chipContent: 'Default chip',
    selected: false,
    outline: false,
  },
};


// Ejemplo de variante con icono
export const WithIcon = {
  render: (args) => ({
    Component: Chip,
    props: args,
  }),
  args: {
    ...Default.args,
    chipContent: 'Beer chip',
    iconFamily: 'icon-park-solid',
    iconName: 'beer-mug',
  },
};

// Ejemplo de variante con icono y botón de cierre
export const WithIconAndClose = {
  render: (args) => ({
    Component: Chip,
    props: args,
  }),
  args: {
    ...Default.args,
    close: true,
    chipContent: 'Closeable beer chip',
    iconFamily: 'icon-park-solid',
    iconName: 'beer-mug',
  },
};

// Ejemplo de variante con botón de cierre
export const WithCloseButton = {
  render: (args) => ({
    Component: Chip,
    props: args,
  }),
  args: {
    ...Default.args,
    close: true,
    chipContent: 'Closeable chip',
  },
};

// Ejemplo de variante con outline
export const OutlineStyle = {
  render: (args) => ({
    Component: Chip,
    props: args,
  }),
  args: {
    ...Default.args,
    outline: true,
    chipContent: 'Outline chip',
  },
};

// Ejemplo de variante seleccionada
export const Selected = {
  render: (args) => ({
    Component: Chip,
    props: args,
  }),
  args: {
    ...Default.args,
    selected: true,
    chipContent: 'Selected chip',
  },
};

// Ejemplo de todas las variantes combinadas
export const AllFeatures = {
  render: (args) => ({
    Component: Chip,
    props: args,
  }),
  args: {
    ...Default.args,
    close: true,
    selected: true,
    outline: false,
    chipContent: 'Complete chip',
  },
};
