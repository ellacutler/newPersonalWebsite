/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: {
    options: {
      // need to add all colors from blog here 
      safelist: ['text-indigo-400','text-indigo-200', 'text-purple-100', 'text-indigo-100',],
    },
  },
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        TrapRegular:"Trap-Regular",
        TrapBold:"Trap-Bold",
        Quiny:"Quiny",
        Gayo: "Gayo"
      }
    },
  },
  plugins: [],
}