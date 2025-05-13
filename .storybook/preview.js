/** @type { import('@storybook/svelte').Preview } */
const preview = {
  parameters: {
    // Configuración global para centrar todas las historias
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
