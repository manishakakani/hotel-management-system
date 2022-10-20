import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#009900", //green
    },
    primary: {
      main: "#e86537", // theme-orange
    },
    secondary: {
      main: "#4b7255", // dark green
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
    text: {
      primary: "#000000", //black
      secondary: "#4b7255", // dark green
      tertiary: "#ffffff", // white
      info: {
        main: "#6B7D6A", //gray
      },
    },
  },
});

export default theme;
