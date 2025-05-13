// @ts-nocheck
import Switch from './Switch.svelte';
import { action } from '@storybook/addon-actions';

// Definición del meta
export default {
  title: 'Garnet UI Library/Animation Components/Switch',
  component: Switch,
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    label: {
      control: 'text',
      description: 'The label text for the Switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    isChecked: {
      control: 'boolean',
      description: 'Controls whether the Switch is checked',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Controls whether the Switch is disabled',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    size: {
      control: 'select',
      options: ['', 'small', 'large'],
      description: 'Controls the size of the Switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    css: {
      control: 'text',
      description: 'Additional CSS classes to apply to the Switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    onchange: {
      action: 'changed',
      description: 'Event handler for when the switch state changes',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    oninput: {
      action: 'input',
      description: 'Event handler for when the switch receives input',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
};

// Historia principal - Default
export const Default = {
  render: (args) => ({
    Component: Switch,
    props: {
      ...args,
      onchange: action('changed'),
      oninput: action('input'),
    },
  }),
  args: {
    id: 'switch-default',
    label: 'Default Switch',
    isChecked: false,
    disabled: false,
    size: '',
    css: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'El switch en su tamaño estándar con una etiqueta.',
      },
    },
  },
};

// Variante deshabilitada
export const Disabled = {
  render: (args) => ({
    Component: Switch,
    props: {
      ...args,
      onchange: action('changed'),
      oninput: action('input'),
    },
  }),
  args: {
    ...Default.args,
    id: 'switch-disabled',
    label: 'Disabled switch',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'El switch en estado deshabilitado.',
      },
    },
  },
};

// Variante marcada (checked)
export const Checked = {
  render: (args) => ({
    Component: Switch,
    props: {
      ...args,
      onchange: action('changed'),
      oninput: action('input'),
    },
  }),
  args: {
    ...Default.args,
    id: 'switch-checked',
    label: 'Checked switch',
    isChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'El switch en estado activado (checked).',
      },
    },
  },
};

// Variante pequeña
export const Small = {
  render: (args) => ({
    Component: Switch,
    props: {
      ...args,
      onchange: action('changed'),
      oninput: action('input'),
    },
  }),
  args: {
    ...Default.args,
    id: 'switch-small',
    label: 'Small switch',
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: 'Una versión más pequeña del componente Switch.',
      },
    },
  },
};

// Variante grande
export const Large = {
  render: (args) => ({
    Component: Switch,
    props: {
      ...args,
      onchange: action('changed'),
      oninput: action('input'),
    },
  }),
  args: {
    ...Default.args,
    id: 'switch-large',
    label: 'Large switch',
    size: 'large',
  },
  parameters: {
    docs: {
      description: {
        story: 'Una versión más grande del componente Switch.',
      },
    },
  },
};

// Variante pequeña y activada
export const SmallChecked = {
  render: (args) => ({
    Component: Switch,
    props: {
      ...args,
      onchange: action('changed'),
      oninput: action('input'),
    },
  }),
  args: {
    ...Default.args,
    id: 'switch-small-checked',
    label: 'Small checked switch',
    size: 'small',
    isChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch pequeño en estado activado.',
      },
    },
  },
};

// Variante sin etiqueta
export const NoLabel = {
  render: (args) => ({
    Component: Switch,
    props: {
      ...args,
      onchange: action('changed'),
      oninput: action('input'),
    },
  }),
  args: {
    ...Default.args,
    id: 'switch-no-label',
    label: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'El switch sin etiqueta de texto.',
      },
    },
  },
};
