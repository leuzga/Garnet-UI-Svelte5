// @ts-nocheck
import Dialog from './Dialog.svelte';

export default {
  title: 'Garnet UI Library/Notification Components/Dialog',
  component: Dialog,
  argTypes: {
    showDialog: {
      control: 'boolean',
      description: 'Controls whether the dialog is visible',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    showBackground: {
      control: 'boolean',
      description: 'Controls whether the modal background overlay is visible',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    modalTitle: {
      control: 'text',
      description: 'The title text for the dialog modal',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Modal title' },
      },
    },
    modalText: {
      control: 'text',
      description: 'The content text for the dialog modal',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Click on the X to close me' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

// Definición de la historia principal usando el formato CSF3
export const Default = {
  args: {
    showDialog: true,
    showBackground: true,
    modalTitle: 'Modal title',
    modalText: 'Click on the X to close me',
  },
};

export const ClosedOnOpen = {
  args: {
    showDialog: false,
    modalTitle: 'Modal title',
    modalText: 'This modal is closed on launch',
  },
};

export const NoBackground = {
  args: {
    showDialog: true,
    showBackground: false,
    modalTitle: 'Modal title',
    modalText: "This modal doesn't show a background",
  },
};
