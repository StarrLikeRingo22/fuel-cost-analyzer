/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html', // Include your HTML files
    './src/**/*.{js,jsx,ts,tsx}', // Include any JS or JSX files if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')], // Add DaisyUI as a plugin
};
