// @ts-nocheck
import ProgressBar from './ProgressBar.svelte';

// Define metadata for the component
export default {
  title: 'Garnet UI Library/Animation Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable progress bar component with animation and accessibility features.',
      },
    },
  },
  argTypes: {
    progressAmt: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The amount of progress (0-100)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 52 },
      },
    },
    precision: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'The number of decimal places to display',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    tweenDuration: {
      control: { type: 'number', min: 0, max: 2000 },
      description: 'The duration of the animation in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 400 },
      },
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the progress change',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    labelInside: {
      control: 'boolean',
      description: 'Whether to display the label inside the progress bar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    labelTextOutside: {
      control: 'text',
      description:
        'The text to display when the label is outside the progress bar',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    color: {
      control: 'color',
      description: 'The color of the progress bar',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#1ab3b3' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Custom aria-label for accessibility',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: undefined },
      },
    },
    minWidth: {
      control: 'text',
      description: 'Minimum width of the progress bar container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '250px' },
      },
    },
    height: {
      control: 'text',
      description: 'Height of the progress bar',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
  },
};

// Template for all stories
const Template = (args) => ({
  Component: ProgressBar,
  props: args,
});

// Default story
export const Default = Template.bind({});
Default.args = {
  progressAmt: 65,
  precision: 0,
  tweenDuration: 400,
  animate: true,
  labelInside: true,
  labelTextOutside: '',
  color: '#1ab3b3',
  minWidth: '250px',
};
Default.parameters = {
  docs: {
    description: {
      story:
        'Default progress bar with label inside. The progress value is displayed inside the colored progress area.',
    },
  },
};

// With Label Inside story
export const WithLabelInside = Template.bind({});
WithLabelInside.args = {
  ...Default.args,
  labelTextOutside: 'Downloading',
  color: '#16a085',
};
WithLabelInside.parameters = {
  docs: {
    description: {
      story:
        'Progress bar with a descriptive label shown alongside the percentage value inside the bar.',
    },
  },
};

// Label Outside story
export const LabelOutside = Template.bind({});
LabelOutside.args = {
  ...Default.args,
  labelInside: false,
  labelTextOutside: 'Download Progress',
  color: '#3498db',
};
LabelOutside.parameters = {
  docs: {
    description: {
      story:
        'Progress bar with the label displayed above it, showing both a descriptive text and the percentage value.',
    },
  },
};

// No Animation story
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  ...Default.args,
  animate: false,
  progressAmt: 33,
  color: '#27ae60',
};
NoAnimation.parameters = {
  docs: {
    description: {
      story: 'Progress bar without animation, changes are applied immediately.',
    },
  },
};

// High Precision story
export const HighPrecision = Template.bind({});
HighPrecision.args = {
  ...Default.args,
  precision: 2,
  progressAmt: 33.567,
  color: '#8e44ad',
};
HighPrecision.parameters = {
  docs: {
    description: {
      story:
        'Progress bar with decimal precision, showing more detailed percentage values.',
    },
  },
};

// Dark Theme story
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  ...Default.args,
  color: '#2c3e50',
  labelTextOutside: 'Dark Theme',
};
DarkTheme.parameters = {
  docs: {
    description: {
      story:
        'Progress bar with a dark color theme, demonstrating automatic text color adjustment for better contrast.',
    },
  },
};

// Custom Size story
export const CustomSize = Template.bind({});
CustomSize.args = {
  ...Default.args,
  minWidth: '400px',
  height: '40px',
  labelTextOutside: 'Larger Bar',
  color: '#e74c3c',
};
CustomSize.parameters = {
  docs: {
    description: {
      story:
        'Progress bar with custom dimensions, showing how the component can be sized to match design requirements.',
    },
  },
};
