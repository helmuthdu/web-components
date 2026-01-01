import type { Preview } from '@storybook/html-vite';
import '../packages/ui/src/styles/styles.css';
import theme from './theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      grid: {
        cellAmount: 5,
        cellSize: 32,
        offsetX: 0,
        offsetY: -1,
        opacity: 0.4
      },

      options: {
        dark: { name: 'dark', value: 'hsl(240deg 4% 9% / 100%)' },
        light: { name: 'light', value: 'hsl(240deg 4% 93% / 100%)' }
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: { theme },
  },

  initialGlobals: {
    backgrounds: {
      value: 'dark'
    }
  }
};

export default preview;
