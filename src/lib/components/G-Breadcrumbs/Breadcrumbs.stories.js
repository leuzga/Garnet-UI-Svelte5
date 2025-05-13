// @ts-nocheck
import Breadcrumbs from './Breadcrumbs.svelte';

export default {
  title: 'Garnet UI Library/Navigation Components/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    breadcrumbItems: { control: 'object' },
    iconFamily: { control: 'text' },
    iconName: { control: 'text' },
    divider: { control: 'text' },
  },
};

export const Default = {
  args: {
    breadcrumbItems: [
      { href: '/', text: 'Dashboard' },
      { href: '/reports', text: 'Annual reports' },
      { href: '/reports/2024', text: '2024' },
    ],
  },
};

export const CustomImage = {
  args: {
    iconFamily: 'material-symbols',
    iconName: 'fast-forward',
    breadcrumbItems: [
      { href: '/', text: 'Dashboard' },
      { href: '/reports', text: 'Annual reports' },
      { href: '/reports/2024', text: '2024' },
    ],
  },
};

export const CustomDivider = {
  args: {
    divider: '>>',
    breadcrumbItems: [
      { href: '/', text: 'Dashboard' },
      { href: '/reports', text: 'Annual reports' },
      { href: '/reports/2024', text: '2024' },
    ],
  },
};

export const CustomText = {
  args: {
    breadcrumbItems: [
      { href: '/', text: 'Home' },
      { href: '/reports', text: 'Custom Text Example' },
      { href: '/reports/2024', text: 'Final Page' },
    ],
  },
};
