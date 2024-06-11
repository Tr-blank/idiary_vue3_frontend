/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.zinc,
      green: colors.emerald,
      yellow: colors.amber,
      red: colors.red
    },
    extend: {}
  },
  plugins: []
}
