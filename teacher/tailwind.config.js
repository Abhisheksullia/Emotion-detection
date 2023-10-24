/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        desktop: "1536px",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(90.58deg,#373b44 0%,#73c8a9 50.52%, #373b44 100%)",
        buttonGradient:
          "linear-gradient(120.58deg,#373b44 0%,#73c8a9 50.52%, #373b44 100%)",
        messageGradient: "linear-gradient(120.58deg,#373b44B0 0%,#73c8a9 100%)",
        textGradient:
          "linear-gradient(94.69deg, #373B44 0%, #73C8A9 54.3%, #373B44 106.38%)",
      },
      colors: {
        primary: "#F84D1B", //blueColor
        secondary: "#023047",
        secondaryText: "#4F4F4F",

        tertiary: "#014262",

        primaryText: "#232F2A", //blackText,
        background: "#E6E6E6",
        authBackground: "#F1f2f9",

        opaque: "#ACB1B6",
        filledColor: "",
        unfilledColor: "#A6ACB8",
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        subheading: "2.5rem",
        heading: "4.5rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      maxWidth: {
        monitor: "1560px",
        messageCard: "360px",
        72: "17rem",
      },
      minWidth: {
        36: "9rem",
        20: "5rem",
        48: "12rem",
        38: "9.5rem",
        40: "10rem",
      },
      minHeight: {
        32: "7rem",
      },
      zIndex: {
        100: "100",
      },
      padding: {
        18: "4.5rem",
      },
      borderWidth: {
        DEFAULT: "1px",
        "1px": "1px",
        "2px": "2px",
        0.5: "2px",
        "0.5px": "0.5px",
      },
      lineHeight: {
        heading: "5rem",
      },
      height: {
        height: "calc(100vh - 160px)",
        consult: "27rem",
        about: "2000px",
        160: "40rem",
        1600: "1600px",
      },
      width: {
        68: "272px",
        84: "336px",
        about: "2000px",
        88: "352px",
        108: "432px",
        120: "495px",
      },
      fontFamily: {
        Playfair: ["Playfair Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};
