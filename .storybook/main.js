/** @type { import('@storybook/svelte-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/svelte-vite',
    options: {
      // Soporte para runas de Svelte 5
      enableSvelteRuneSupport: true,
    },
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
