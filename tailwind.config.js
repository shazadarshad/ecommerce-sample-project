/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Professional color palette
        primary: '#2563EB', // Blue - buttons, links, highlights
        accent: '#F97316', // Orange - sale badges, hover states
        // Dark navy (kept for dark mode backgrounds)
        "dark-navy": "#0F172A",
        "text-primary": "#111827", // Dark text for readability
        // Light blue (kept for gradients - used sparingly)
        "light-blue": "#38BDF8",
        // Purple accent (kept for gradients - used sparingly)
        "purple-accent": "#A855F7",
        // Background colors
        "light-bg": "#F9FAFB",
        "gray-bg": "#F3F4F6",
        // Dark mode colors
        "dark-bg": "#0A0E1A",
        "dark-card": "#151925",
        "dark-border": "#1E293B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color',
      },
    },
  },
  plugins: [],
};
