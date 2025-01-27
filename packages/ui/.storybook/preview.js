import theme from './theme';
import '../src/styles/styles.css';

export default {
  parameters: {
    docs: { theme },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/
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
        offsetY: -1
      }
    }
  }
};
