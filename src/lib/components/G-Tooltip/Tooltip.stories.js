// @ts-nocheck
import Tooltip from './Tooltip.svelte';

export default {
  title: 'Garnet UI Library/Notification Components/Tooltip',
  component: Tooltip,
  argTypes: {
    tip: {
      control: 'text',
      description: 'Content to display inside the tooltip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    label: {
      control: 'text',
      description: 'Accessibility label for the tooltip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Additional information' },
      },
    },
    buttonText: {
      control: 'text',
      description: 'Text for the tooltip trigger button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '?' },
      },
    },
    buttonAriaLabel: {
      control: 'text',
      description: 'ARIA label for the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Show additional information' },
      },
    },
    showHTML: {
      control: 'boolean',
      description: 'Allow HTML content in tooltip',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    timeout: {
      control: 'text',
      description: 'Delay in milliseconds before showing/hiding',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '400' },
      },
    },
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Tooltip position relative to button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
    },
    id: {
      control: 'text',
      description: 'Unique ID for the tooltip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'tooltip' },
      },
    },
  },
  parameters: {
    docs: {
      story: {
        height: '150px',
      },
      description: {
        component:
          'Accessible tooltip component that displays additional information on hover or focus.',
      },
    },
  },
};

export const Default = {
  render: (args) => ({
    Component: Tooltip,
    props: args,
  }),
  args: {
    tip: 'This is a basic informational tooltip',
    label: 'More information',
    buttonText: '?',
    showHTML: false,
    timeout: '400',
    position: 'bottom',
  },
};

export const CustomHTML = {
  render: (args) => ({
    Component: Tooltip,
    props: args,
  }),
  args: {
    ...Default.args,
    tip: '<p>This is a tooltip with <strong>custom HTML</strong> - <a href="/tutorial">click here</a> to learn more</p>',
    showHTML: true,
    timeout: '300',
  },
};

export const TopPosition = {
  render: (args) => ({
    Component: Tooltip,
    props: args,
  }),
  args: {
    ...Default.args,
    tip: 'This tooltip appears above the button',
    position: 'top',
  },
};

export const CustomButton = {
  render: (args) => ({
    Component: Tooltip,
    props: args,
  }),
  args: {
    ...Default.args,
    tip: 'Tooltip with a custom button',
    buttonText: 'i',
    buttonAriaLabel: 'View information',
  },
};
