import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import tailwindContainerQuery from '@tailwindcss/container-queries'
import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    "providers/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "../../packages/ui/src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      colors: {
        light: {
          neutral: {
            DEFAULT: '#ffffff',
            '10': '#fbf9f8',
            '20': '#f5f4f2',
            '30': '#f1efed',
            '40': '#e4e1ed',
            '50': '#d4cfca',
            '60': '#bcb6b1',
            '70': '#aea8a2',
            '80': '#9e9892',
            '90': '#8b8580',
            '100': '#7a736e',

            '190': '#161513'
          },
          brand: {
            DEFAULT: '#f5fafc',
            '10': '#f5fafa',
            '20': '#edf6f9',
            '30': '#e7f2f5',
            '40': '#d0e5ed',
            '50': '#b5d5e0',
            '60': '#94bfce',
            '70': '#81b2c3',
            '80': '#6ba1b6',

            '120': '#36677d'
          },
          success: {
            10: '#f4fceb',
            20: '#ebf8de',
            30: '#e4f5d3',
            40: '#cfebb3',
            50: '#b1dd88',
            60: '#8ac94f',
            70: '#7dba45',
            80: '#6fa939',
            90: '#5e942b',
            100: '#508223',
            110: '#497620',
            120: '#436b1d'
          },
          danger: {
            '120': '#b3311f'
          },
          text: {
            primary: '#161513', //light-neutral-190
          }
        },
        border: "hsl(var(--border))",
        input: {
          DEFAULT: "hsl(var(--input))",
          border: "#16151380",
          'border-selected': "#227E9E",
          label: '#161513B3'
        },
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#325672",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderColor: {
        'light-enabled': '#16151380',
        'light-disabled': '#16151333',
      }
    },
  },
  plugins: [tailwindcssAnimate, tailwindContainerQuery],
} satisfies Config

export default config
