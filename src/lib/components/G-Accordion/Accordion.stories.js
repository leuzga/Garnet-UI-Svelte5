// @ts-nocheck
import Accordion from './Accordion.svelte';

// Definición del meta
export default {
  title: 'Garnet UI Library/Action Components/Accordion',
  component: Accordion,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the accordion is expanded',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    data: {
      control: 'object',
      description: 'Array of accordion items with title and text',
      table: {
        type: { summary: 'Array<{title: string, text: string}>' },
        defaultValue: { summary: '[]' },
      },
    },
  },
};

// Definición de la historia principal usando el formato CSF3
export const Default = {
  render: (args) => ({
    Component: Accordion,
    props: args,
  }),
  args: {
    isOpen: false,
    data: [
      {
        title: 'Heading 1',
        text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada, nulla sed lacinia accumsan, ligula arcu interdum urna, eget rhoncus sapien orci scelerisque metus.',
      },
      {
        title: 'Heading 2',
        text: 'In bibendum commodo orci nec semper. Nam magna mauris, ornare eu semper sit amet, vehicula sed metus',
      },
      {
        title: 'Heading 3',
        text: 'Mauris tortor mi, scelerisque nec metus nec, finibus euismod lacus. Maecenas non porttitor arcu',
      },
    ],
  },
};
