import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = responsiveFontSizes(
  createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1936,
      },
    },
    spacing: 4,
    typography: {
      fontFamily: ["Roboto", "Raleway", "Open Sans"].join(","),
      h1: {
        fontSize: "5rem",
        fontFamily: "Raleway",
      },
      h2: {
        fontSize: "3.5rem",
        fontFamily: "Open Sans",
        fontStyle: "bold",
      },
      h3: {
        fontSize: "2.5rem",
        fontFamily: "Roboto",
      },
    },
    palette: {
      background: {
        default: "#009900", //green
      },
      primary: {
        main: "#e86537", // theme-orange
        // main: "#2B37D4", // indigo
      },
      // secondary: {
      //   main: "#000", // black
      // },
      secondary: {
        main: "#4b7255",
      },
      forLightGreen: {
        main: "#99b481",
      },
      error: {
        main: "#D72A2A", //red
      },
      warning: {
        main: "#FC7B09", //orange
      },
      info: {
        main: "#6B7D6A", //gray
      },
      success: {
        main: "#4BB543", //green
      },
      forBlack: {
        main: "#000", //black
      },
      forWhite: {
        main: "#fff", //white
      },
      text: {
        primary: "#000000", //black
        // secondary: "#e86537",
        tertiary: "#ffffff",
        secondary: "#4b7255",
        forLightGreen: "#99b481",
        info: {
          main: "#6B7D6A", //gray
        },
      },
    },
  })
);

export default theme;
