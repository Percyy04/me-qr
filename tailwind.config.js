/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'canvas-bg': '#F8FAFC',
        'surface-card': '#FFFFFF',
        'border-subtle': '#E2E8F0',
        'primary-container': '#4F46E5',
        'indigo-tint': '#EEF2FF',
        'slate-text-strong': '#0F172A',
        'slate-text-muted': '#64748B',
        'success-emerald-glow': '#D1FAE5',
        'secondary-cta': '#10B981',
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        'preview': '0 15px 30px -10px rgba(79, 70, 229, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8)',
      },
    },
  },
  plugins: [],
};

