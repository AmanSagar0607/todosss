/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg1' : '#EB5E28',
        'btn1' : '#EB5E28',
        'btn2' : '#403D39',
        'bg2' : '#403D39',
        'btn3' : '#FFFCF2',
        'bg3' : '#FFFCF2',
        'bg4' : '#999999',
        'dark-btn' : '#eb5f2884',
        'dark-bg' : '#0b0a0a',
        'main-bg' : '#141414',
        // 'dark-forest': '#081C15',
        // 'deep-emerald': '#1B4332',
        // 'lush-green': '#2D6A4F',
        // 'vibrant-teal': '#40916C',
        // 'fresh-mint': '#52B788',
        // 'fresh-violet': '#7b2cbf',
        // 'soft-green': '#74C69D',
        // 'gentle-green': '#95D5B2',
        // 'pale-mint': '#B7E4C7',
        // 'light-mint': '#D8F3DC',
      },
    },
  },
  plugins: [],
}
