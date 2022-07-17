import '../tailwind.css?raw';
import theme from './theme';

export const parameters = {
  docs: { theme },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'light', value: '#f5f5f5' },
      { name: 'dark', value: '#333333' }
    ],
    grid: {
      cellSize: 32,
      opacity: 0.4,
      cellAmount: 5,
      offsetX: 0,
      offsetY: -1,
    }
  }
};
