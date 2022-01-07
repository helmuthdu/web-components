module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        contrast: {
          50: 'var(--color-contrast-50)',
          100: 'var(--color-contrast-100)',
          200: 'var(--color-contrast-200)',
          300: 'var(--color-contrast-300)',
          400: 'var(--color-contrast-400)',
          500: 'var(--color-contrast-500)',
          600: 'var(--color-contrast-600)',
          700: 'var(--color-contrast-700)',
          800: 'var(--color-contrast-800)',
          900: 'var(--color-contrast-900)'
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
