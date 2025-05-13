// @ts-nocheck
import Alarm from './Alarm.svelte';
import { action } from '@storybook/addon-actions';

// Define las variantes que usarás para el componente principal
const variants = {
  Default: {
    args: {
      notifications: 23,
      label: 'Alarm with label',
      countColor: '#733635',
      countBackgroundColor: '#f4f4f4',
      filled: false,
      small: false,
    },
    description: 'The default alarm appearance with notifications counter.',
  },
  Filled: {
    args: {
      notifications: 12,
      label: 'Alarm with label',
      countColor: '#733635',
      countBackgroundColor: '#f4f4f4',
      filled: true,
      small: false,
    },
    description:
      'Alarm with filled bell icon style for stronger visual emphasis.',
  },
  Small: {
    args: {
      notifications: 12,
      label: 'Alarm with label',
      countColor: '#733635',
      countBackgroundColor: '#f4f4f4',
      filled: true,
      small: true,
    },
    description:
      'A compact version of the alarm for space-constrained interfaces.',
  },
  NoNotifications: {
    args: {
      notifications: 0,
      label: 'Alarm with label',
      countColor: '#733635',
      countBackgroundColor: '#f4f4f4',
      filled: false,
      small: false,
    },
    description: 'Alarm display when there are no notifications present.',
  },
  CustomColors: {
    args: {
      notifications: 99,
      label: 'Alarm with label',
      countColor: '#ffffff',
      countBackgroundColor: '#E91E63',
      filled: false,
      small: false,
    },
    description:
      'Alarm with customized color scheme to match specific UI themes.',
  },
};

export default {
  title: 'Garnet UI Library/Animation Components/Alarm',
  component: Alarm,
  argTypes: {
    notifications: {
      control: 'number',
      description: 'Number of notifications to display',
      defaultValue: 26,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 26 },
      },
    },
    label: {
      control: 'text',
      description: 'The label text for the Alarm',
      defaultValue: 'This is a test label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'This is a test label' },
      },
    },
    countColor: {
      control: 'color',
      description: 'Color of the notification count text',
      defaultValue: '#733635',
      table: {
        type: { summary: 'string (color)' },
        defaultValue: { summary: '#733635' },
      },
    },
    countBackgroundColor: {
      control: 'color',
      description: 'Background color of the notification count',
      defaultValue: '#f4f4f4',
      table: {
        type: { summary: 'string (color)' },
        defaultValue: { summary: '#f4f4f4' },
      },
    },
    filled: {
      control: 'boolean',
      description: 'Controls whether the bell icon is filled or outlined',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    small: {
      control: 'boolean',
      description: 'Controls whether to display a smaller version of the alarm',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onchange: {
      action: 'changed',
      description: 'Event handler for when the alarm state changes',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A notification alarm component with configurable appearance and behavior.',
      },
      canvas: { sourceState: 'shown' },
    },
    controls: {
      expanded: true,
      sort: 'alpha',
    },
    // Forzar la visualización de la tabla de variantes
    options: {
      storySort: {
        order: [
          'Default',
          'Filled Icon',
          'Small Size',
          'Empty (No Notifications)',
          'Custom Color Theme',
        ],
      },
    },
  },
};

// Historia principal
export const Default = {
  name: 'Default',
  render: (args) => ({
    Component: Alarm,
    props: args,
  }),
  args: variants.Default.args,
  parameters: {
    docs: {
      story: { inline: true },
      description: { story: variants.Default.description },
    },
  },
};

// Variante con ícono relleno
export const FilledIcon = {
  name: 'Filled Icon',
  render: (args) => ({
    Component: Alarm,
    props: args,
  }),
  args: variants.Filled.args,
  parameters: {
    docs: {
      story: { inline: true },
      description: { story: variants.Filled.description },
    },
  },
};

// Variante pequeña
export const SmallSize = {
  name: 'Small Size',
  render: (args) => ({
    Component: Alarm,
    props: args,
  }),
  args: variants.Small.args,
  parameters: {
    docs: {
      story: { inline: true },
      description: { story: variants.Small.description },
    },
  },
};

// Variante sin notificaciones
export const EmptyNotifications = {
  name: 'Empty (No Notifications)',
  render: (args) => ({
    Component: Alarm,
    props: args,
  }),
  args: variants.NoNotifications.args,
  parameters: {
    docs: {
      story: { inline: true },
      description: { story: variants.NoNotifications.description },
    },
  },
};

// Variante con colores personalizados
export const CustomColorTheme = {
  name: 'Custom Color Theme',
  render: (args) => ({
    Component: Alarm,
    props: args,
  }),
  args: variants.CustomColors.args,
  parameters: {
    docs: {
      story: { inline: true },
      description: { story: variants.CustomColors.description },
    },
  },
};
