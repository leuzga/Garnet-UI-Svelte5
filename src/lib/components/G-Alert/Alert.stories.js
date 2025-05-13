// @ts-nocheck
import Alert from './Alert.svelte';

// Definición del meta
export default {
  title: 'Garnet UI Library/Notification Components/Alert',
  component: Alert,
  argTypes: {
    show: {
      control: 'boolean',
      description: 'Controla si la alerta se muestra',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    showIcon: {
      control: 'boolean',
      description: 'Determina si se muestra el icono de la alerta',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    type: {
      control: 'select',
      options: ['info', 'warn', 'error', 'success', 'dark'],
      description:
        'El tipo de alerta que define el estilo y el icono predeterminado',
      defaultValue: 'info',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'El título de la alerta',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    description: {
      control: 'text',
      description: 'Descripción o mensaje principal de la alerta',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    showAnimation: {
      control: 'boolean',
      description: 'Si la alerta debe mostrarse con una animación de entrada',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },

    icons: {
      control: 'object',
      description:
        'Array de objetos con la estructura { family, name } para personalizar los iconos',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    iconSize: {
      control: 'text',
      description: 'Tamaño del icono (por ejemplo, "1em", "24px")',
      defaultValue: '1em',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1em' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Componente Alert para mostrar notificaciones con diferentes niveles de importancia.',
      },
      story: {
        height: '150px',
      },
    },
  },
};

// Historia principal usando el formato CSF3
export const Default = {
  render: (args) => ({
    Component: Alert,
    props: args,
  }),
  args: {
    show: true,
    type: 'info',
    title: 'Simple Info',
    description: 'An info description',
    showIcon: true,
    showAnimation: true,
  },
};

export const Warn = {
  render: (args) => ({
    Component: Alert,
    props: args,
  }),
  args: {
    show: true,
    type: 'warn',
    title: 'Simple warning',
    description: 'A warning message',
    showIcon: true,
    showAnimation: true,
  },
};

export const Error = {
  render: (args) => ({
    Component: Alert,
    props: args,
  }),
  args: {
    show: true,
    type: 'error',
    title: 'Error message',
    description: 'An error message',
    showIcon: true,
    showAnimation: true,
  },
};

export const Success = {
  render: (args) => ({
    Component: Alert,
    props: args,
  }),
  args: {
    show: true,
    type: 'success',
    title: 'Success message',
    description: 'Operation completed successfully',
    showIcon: true,
    showAnimation: true,
  },
};

export const Dark = {
  render: (args) => ({
    Component: Alert,
    props: args,
  }),
  args: {
    show: true,
    type: 'dark',
    title: 'Dark mode alert',
    description: 'A dark themed notification',
    showIcon: true,
    showAnimation: true,
  },
};

export const NoAnimation = {
  render: (args) => ({
    Component: Alert,
    props: args,
  }),
  args: {
    show: true,
    type: 'info',
    title: 'No animation',
    description: 'Alert without fade-in animation',
    showIcon: true,
    showAnimation: false,
  },
};

export const NoIcon = {
  render: (args) => ({
    Component: Alert,
    props: args,
  }),
  args: {
    show: true,
    type: 'info',
    title: 'No icon',
    description: 'Alert without an icon',
    showIcon: false,
    showAnimation: true,
  },
};
