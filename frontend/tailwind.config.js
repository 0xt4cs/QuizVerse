/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inria-sans': ['"Inria Sans"', 'sans-serif'],
        'Josefin-Sans': ['"Josefin Sans"', 'sans-serif'],
        'Instrument-Sans': ['"Instrument Sans"', 'sans-serif' ]
      },
      keyframes: {
        slideup: {
          '0%': { transform: 'translateY(100%)',opacity:'0'},
          '100%': { transform: 'translateY(0)' },
        },
        slidedown:{
          '0%':{ transform: 'translateY(-100%)', opacity:'0'},
          '100%': { transform: 'translateY(0)' },
        },
        fadein:{
          '0%': {opacity:'0'},
          '100%' : {opacity: '1'},
        },
          page2: {
            '0%': { transform: 'rotateY(180deg)', opacity: '0' },
            '20%': { opacity: '1' },
            '35%, 100%': { opacity: '0' },
            '50%, 100%': { transform: 'rotateY(0deg)' },
          },
          page3: {
            '15%': { transform: 'rotateY(180deg)', opacity: '0' },
            '35%': { opacity: '1' },
            '50%, 100%': { opacity: '0' },
            '65%, 100%': { transform: 'rotateY(0deg)' },
          },
          page4: {
            '30%': { transform: 'rotateY(180deg)', opacity: '0' },
            '50%': { opacity: '1' },
            '65%, 100%': { opacity: '0' },
            '80%, 100%': { transform: 'rotateY(0deg)' },
          },
          page5: {
            '45%': { transform: 'rotateY(180deg)', opacity: '0' },
            '65%': { opacity: '1' },
            '80%, 100%': { opacity: '0' },
            '95%, 100%': { transform: 'rotateY(0deg)' },
          },
      },
    },
      animation: {
        slideup: 'slideup 1s ease-in-out',
        slidedown: 'slidedown 1s ease-in-out',
        fadein : 'fadein 1s ease-in',
        page2: 'page2 1s ease-in-out',
        page3: 'page3 1s ease-in-out',
        page4: 'page4 1s ease-in-out',
        page5: 'page5 1s ease-in-out',
      }
    },
  }
