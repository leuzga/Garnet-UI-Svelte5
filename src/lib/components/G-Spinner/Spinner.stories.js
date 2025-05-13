import Spinner from './Spinner.svelte';

// Configuración central del componente para Storybook 8
export default {
  title: 'Garnet UI Library/Action Components/Spinner',
  component: Spinner,
  // Controles para cada prop
  argTypes: {
    color: {
      control: { type: 'color' },
      description: 'Color of the spinner',
    },
    duration: {
      control: { type: 'text' },
      description: 'Animation duration (including unit such as "0.75s")',
    },
    size: {
      control: { type: 'text' },
      description: 'Size of the spinner',
    },
    unit: {
      control: { type: 'text' },
      description: 'Unit of measurement (px, rem, etc)',
    },
    pause: {
      control: { type: 'boolean' },
      description: 'Pause the animation',
    },
    variant: {
      control: { type: 'select' },
      options: ['circle', 'jumper', 'jellyfish'],
      description: 'Animation variant',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class to apply styles',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A core spinner component that can be used to create various loading animations',
      },
    },
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
};

// Circle spinner
export const Circle = {
  args: {
    color: '#733635',
    duration: '0.75s',
    size: '40',
    variant: 'circle',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner showing a rotating circle',
      },
    },
  },
};

// Jumper spinner - Con altura ajustada específica para esta variante
export const Jumper = {
  args: {
    color: '#733635',
    duration: '1s',
    size: '60',
    variant: 'jumper',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner with a bounce effect',
      },
      canvas: {
        height: '350px',
      },
    },

  },

};

// Jellyfish spinner
export const Jellyfish = {
  args: {
    color: '#733635',
    duration: '2.5s',
    size: '60',
    variant: 'jellyfish',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner with a jellyfish-like undulating effect',
      },
    },
  },
};

// Paused animation
export const PausedAnimation = {
  args: {
    color: '#733635',
    duration: '2.5s',
    size: '60',
    pause: true,
    variant: 'jellyfish',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner with animation paused',
      },
    },
  },
};
