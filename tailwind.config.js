/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      'blacke':"#000000",
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#42454D',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'blue': '#2095F2',
      "topbg":"#212328",
      'gray':"#B9B9BB",
      'bg':'#1A1A1A',
      'textbg':'#383B42',
      'red':"#E40000",
      "green":"#67d12a",
      "chatbg":"#383C42",
      "yellow":"#FFFF00"

    },    screens: {
      'xs': '390px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1040px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl':'1800px'
    },

    extend: {
      keyframes: {
        fade: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-loop': 'fade 5s infinite', // Adjust the duration as needed
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.white'),
              margin: 0,
              padding: 0,
              lineHeight: theme('lineHeight.1')
            },
            'blockquote': {
              color: theme('colors.white'),
            },
               'strong': {
              color: theme('colors.white'),
            }
            // Add more selectors if needed
            ,
            ol: {
              'list-style-type': 'decimal',
              
            },
            ul: {
              'list-style-type': 'disc',
             
            },
            li: {
              marginBottom: theme('spacing.0.1'),
              marginTop: theme('spacing.0.1'),
              'p': {
                marginTop: theme('spacing.0'), 
                marginBottom: theme('spacing.0'),
                lineHeight: theme('lineHeight.1'),
              },
// Adjust the spacing here
            },
          },
        },
      }),
    },
  },
  plugins: [require('tailwind-scrollbar'),
    require('@tailwindcss/typography')

  ],
};
