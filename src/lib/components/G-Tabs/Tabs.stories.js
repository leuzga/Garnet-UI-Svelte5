// @ts-nocheck
import Tabs from './Tabs.svelte';
import tabItems from './tabsdata.json';

// Definición del meta
export default {
  title: 'Garnet UI Library/Navigation Components/Tabs',
  component: Tabs,
  argTypes: {
    activeTabValue: {
      control: 'text',
      description: 'The value of the currently active tab',
      defaultValue: '0',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    items: {
      control: 'object',
      description: 'Array of tab items with name and text properties',
      defaultValue: tabItems,
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    vertical: {
      control: 'boolean',
      description: 'Determines if the tabs are displayed vertically',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    icons: {
      control: 'object',
      description: 'Array of icon objects with family and name properties',
      defaultValue: [],
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    iconSize: {
      control: 'text',
      description: 'Size of the icon (e.g., "1em", "24px")',
      defaultValue: '1em',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1em' },
      },
    },
  },
};

// Define el array de iconos para reutilizar
const tabIcons = [
  { family: 'lucide', name: 'home' },
  { family: 'lucide', name: 'user' },
  { family: 'lucide', name: 'settings' },
  { family: 'lucide', name: 'mail' },
  { family: 'lucide', name: 'line-chart' },
];

// Otros arrays de iconos para variantes
const materialIcons = [
  { family: 'material-symbols', name: 'home' },
  { family: 'material-symbols', name: 'person' },
  { family: 'material-symbols', name: 'settings' },
  { family: 'material-symbols', name: 'mail' },
  { family: 'material-symbols', name: 'analytics' },
];

const iconParkIcons = [
  { family: 'icon-park-solid', name: 'home' },
  { family: 'icon-park-solid', name: 'user' },
  { family: 'icon-park-solid', name: 'setting' },
  { family: 'icon-park-solid', name: 'mail' },
  { family: 'icon-park-solid', name: 'chart-line' },
];

// Historia principal
export const Default = {
  render: (args) => ({
    Component: Tabs,
    props: args,
  }),
  args: {
    activeTabValue: '0',
    items: tabItems,
    vertical: false,
  },
};

// Variante vertical
export const Vertical = {
  render: (args) => ({
    Component: Tabs,
    props: args,
  }),
  args: {
    ...Default.args,
    vertical: true,
  },
};

// Variante con iconos Lucide
export const WithLucideIcons = {
  render: (args) => ({
    Component: Tabs,
    props: args,
  }),
  args: {
    ...Default.args,
    icons: tabIcons,
    iconSize: '1.2em',
  },
};

// Variante con iconos Material Symbols
export const WithMaterialIcons = {
  render: (args) => ({
    Component: Tabs,
    props: args,
  }),
  args: {
    ...Default.args,
    icons: materialIcons,
    iconSize: '1.2em',
  },
};

// Variante con iconos Icon Park
export const WithIconParkIcons = {
  render: (args) => ({
    Component: Tabs,
    props: args,
  }),
  args: {
    ...Default.args,
    icons: iconParkIcons,
    iconSize: '1.4em',
  },
};

// Variante con iconos y vertical
export const VerticalWithIcons = {
  render: (args) => ({
    Component: Tabs,
    props: args,
  }),
  args: {
    ...Default.args,
    vertical: true,
    icons: tabIcons,
    iconSize: '1.2em',
  },
};

// Variante con iconos parciales (solo algunos tabs tienen iconos)
export const PartialIcons = {
  render: (args) => ({
    Component: Tabs,
    props: args,
  }),
  args: {
    ...Default.args,
    icons: [
      { family: 'lucide', name: 'home' },
      null, // Sin icono para la segunda tab
      { family: 'lucide', name: 'settings' },
      null, // Sin icono para la cuarta tab
      { family: 'lucide', name: 'line-chart' },
    ],
    iconSize: '1.2em',
  },
};
