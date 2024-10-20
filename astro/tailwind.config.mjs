/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      mk: ["mk", "sans-serif"],
    },
    extend: {
      backgroundImage: (theme) => ({
        "waves-texture": "url('/app/src/assets/img/bg-blue-waves.png')",
        "waves-texture_staff-todo": "url('/app/src/assets/img/waveBackgrounds/wavesTealDown.png')",
        "waves-texture_staff-todo-up": "url('/app/src/assets/img/waveBackgrounds/wavesTealUp.png')",
      }),
      content: {
        exclamationIcon: "url('/app/src/assets/icons/exclamation-small.svg')",
      },
      screens: {
        xs: "400px",
        sm: "500px",
        md: "768px",
        lg: "1000px",
        xl: "1440px",
        "2xl": "1600px",
      },
      height: {
        "80vh": "80vh",
      },
      zIndex: {
        2000: "2000",
        2001: "2001",
      },
      colors: {
        black: {
          DEFAULT: "#000000",
          100: "#E4E7EC",
          50: "#F7F9FC",
          150: "#FDFDFD",
          300: "#D0D5DD",
          500: "#667185",
          700: "#3C3E3E",
          900: "#101928",
        },
        blue: {
          5: "#DDF9F7",
          10: "#E8F3FE",
          20: "#09A1DE",
          30: "#D8FBFF",
          50: "#00678E",
          75: "#A8D4FF",
          100: "#85d7ff",
          150: "#79BDFF",
          175: "#00A1DE",
          200: "#1fb6ff",
          300: "#53A5F5",
          400: "#1E88EE",
          500: "#0375E3",
          600: "#0067C9",
          700: "#0054A4",
          800: "#004281",
          900: "#003262",
          950: "#006C95",
        },
        purple: {
          DEFAULT: "#ff49db",
          50: "#EFE8FF",
          100: "#D4B7EF",
          200: "#8E52C8",
          400: "#522398",
          450: "#7946AB",
          500: "#683699",
          600: "#3D127D",
          700: "#410B76",
          800: "#8D52C8",
          900: "#7946AB",
          950: "#3D127D",
        },
        violet: {
          DEFAULT: "#561C8E",
          25: "#EFE8FF80",
          50: "#F7F3FF",
          100: "#D4B7EF",
          300: "#AA6BE7",
          400: "#8E52C8",
          500: "#683699",
          600: "#561C8E",
        },
        gray: {
          DEFAULT: "#c0ccda",
          100: "#f9fafc",
          200: "#D0D5DD",
          300: "#1f2d3d",
          400: "#637381",
          700: "#3c4858",
        },
        amber: {
          100: "#FFEDB8",
        },
        teal: {
          75: "#86ECE7",
          100: "#B7EEEC",
          200: "#1AA39C",
          300: "#50E4DD",
          400: "#15BAB2",
          500: "#118E88",
          600: "#05827C",
          700: "#0C635F",
          800: "#00706A",
          900: "#004E49",
        },
        pink: {
          DEFAULT: "#D31F75",
          50: "#FFE4F0",
          600: "#A30D4B",
        },
        yellow: {
          DEFAULT: "#FFC000",
          100: "#FEF3C7",
          400: "#FBBF24",
        },
        green: {
          DEFAULT: "#00A600",
          500: "#098000",
        },
        navy: {
          DEFAULT: "#0375E3",
        },
        buttonblue: {
          DEFAULT: "#0067C9",
        },
        lightblue: {
          DEFAULT: "#0475E3",
        },
        warning: {
          DEFAULT: "#BA1D1D",
        },
      },
    },
  },
  plugins: [],
};
