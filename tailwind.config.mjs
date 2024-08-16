/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        main: '#1e293b',
        'main-dark': '#f8fafc',
        'main-dark-bg': '#282a36',
        'nav-dark-bg': '#323541',
        'code-dark-bg': '#343e4c',
        'dark-border': '#3b3e54',
        link: '#2563eb', // blue-600
        'link-dark': '#ffd479',
      },
      animation: {
        fadeIn: 'fadeIn 500ms;',
        wave: 'wave 2s linear infinite',
        toTop: 'toTop 0.3s alternate ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        toTop: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(0, -3px)' },
        },
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: '1.2',
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      fontFamily: {
        heading: ['Recoleta', 'Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
