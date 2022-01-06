module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        backdrop: {
          DEFAULT: 'var(--color-backdrop)',
          50: 'var(--color-backdrop-50)',
          100: 'var(--color-backdrop-100)',
          200: 'var(--color-backdrop-200)',
          300: 'var(--color-backdrop-300)',
          400: 'var(--color-backdrop-400)',
          500: 'var(--color-backdrop-500)',
          600: 'var(--color-backdrop-600)',
          700: 'var(--color-backdrop-700)',
          800: 'var(--color-backdrop-800)',
          900: 'var(--color-backdrop-900)'
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          backdrop: 'var(--color-primary-backdrop)',
          focus: 'var(--color-primary-focus)',
          content: 'var(--color-primary-content)',
          contrast: 'var(--color-primary-contrast)'
        },
        error: {
          DEFAULT: 'var(--color-error)',
          backdrop: 'var(--color-error-backdrop)',
          focus: 'var(--color-error-focus)',
          content: 'var(--color-error-content)',
          contrast: 'var(--color-error-contrast)'
        },
        success: {
          DEFAULT: 'var(--color-success)',
          backdrop: 'var(--color-success-backdrop)',
          focus: 'var(--color-success-focus)',
          content: 'var(--color-success-content)',
          contrast: 'var(--color-success-contrast)'
        },
        content: {
          DEFAULT: 'var(--color-content-body)',
          heading: 'var(--color-content-heading)',
          secondary: 'var(--color-content-secondary)',
          tertiary: 'var(--color-content-tertiary)',
          disabled: 'var(--color-content-disabled)'
        }
      }
    }
  },
  plugins: []
};
