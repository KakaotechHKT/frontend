import type { Config } from 'tailwindcss'
import TailwindAniamte from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // service colors
        rcKakaoYellow: '#EEC71E',
        rcKakaoLightYellow: '#FFF7C2',
        rcGreen: '#A3DB7E',
        rcRed: '#FC2312',
        rcBlue: '#175EB5',
        rcGray: '#E1E2E6',
        rcLightGray: '#E8E9EB',
        rcDarkGray: '#5D5F62',
        rcBlack: '#000000',
        rcWhite: '#FFFFFF',
        rcChatGray: '#E8E9EB60',
        rcBackdrop: '#00000080',

        // Hover colors
        rcKakaoYellowHover: '#FFDC44',
        rcGreenHover: '#B9E49C',
        rcBlueHover: '#3470B9',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        sm: '0.5px',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        dohyeon: ['var(--font-dohyeon)'],
      },
      boxShadow: {
        'rc-shadow': '0px 2px 3px 0px rgba(0, 0, 0, 0.18)',
      },
      fontSize: {
        xss: '0.625rem',
        tiny: '0.5rem',
      },
      animation: {
        opacityDelay1: 'opacityFade 1.5s infinite',
        opacityDelay2: 'opacityFade 1.5s 0.2s infinite',
        opacityDelay3: 'opacityFade 1.5s 0.4s infinite',
      },
      keyframes: {
        opacityFade: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [TailwindAniamte],
} satisfies Config
