import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import typography from "./Typography";
import components from "./Override";

const TopbarHeight = 75;

const commonColors = {
  black: "#1F1F1F",
  linen: "#fcf8f5",
};

let theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: commonColors.black,
      secondary: commonColors.linen,
      disabled: "#9e9e9e",
      danger: "#ff3232",
    },
    info: {
      main: "#9A98B5",
    },
    background: {
      default: "#fff",
      main: commonColors.linen,
    },
    primary: {
      main: commonColors.black,
      contrastText: commonColors.linen,
    },
    secondary: {
      main: commonColors.linen,
      contrastText: commonColors.black,
    },
    warning: {
      main: "#C41E3D",
    },
    black: {
      main: commonColors.black,
      contrastText: commonColors.linen,
    },
    linen: {
      main: commonColors.linen,
      contrastText: commonColors.black,
    },
    violet: {
      main: "#4a264b",
      contrastText: commonColors.black,
    },
    lightViolet: {
      main: "#9A98B5",
      contrastText: commonColors.linen,
    },
    red: {
      main: "#C41E3D",
      contrastText: commonColors.linen,
    },
    almond: {
      main: "#f5deca",
      contrastText: commonColors.black,
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "rgba(0, 0, 0, 0.03)",
    },
  },
  shape: {
    borderRadius: 5,
  },
  mixins: {
    toolbar: {
      color: "#949db2",
      "@media(min-width:1280px)": {
        minHeight: TopbarHeight,
        padding: "0 30px",
      },
      "@media(max-width:1280px)": {
        minHeight: "64px",
      },
    },
  },
  status: {
    danger: "#e53e3e",
  },
  components,
  typography,
});
theme = responsiveFontSizes(theme);

export { TopbarHeight, theme };
