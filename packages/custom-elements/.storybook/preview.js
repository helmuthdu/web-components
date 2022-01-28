import '!style-loader!css-loader!postcss-loader!../tailwind.css';
import theme from './theme';

export const parameters = {
  docs: { theme },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
