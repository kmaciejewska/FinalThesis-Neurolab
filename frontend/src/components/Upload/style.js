import { createTheme } from "@mui/system";
import { theme } from "../../assets/global/Theme";

export const enabledTheme = createTheme(
  {
    overrides: {
      MuiDropzoneArea: {
        root: {
          width: "80%",
          minHeight: "180px",
          backgroundColor: "transparent",
          borderRadius: 0,
          borderColor: theme.palette.lightViolet.main,
          position: "absolute",
          top: 0,
          marginBottom: "30px",
        },
        icon: {
          color: theme.palette.lightViolet.main,
        },
        text: {
          color: theme.palette.text.primary,
          fontWeight: "300",
        },
      },
      MuiDropzonePreviewList: {
        root: {
          maxWidth: "80%",
          justifyContent: "start",
          color: theme.palette.text.primary,
          marginTop: "90px",
          position: "absolute",
        },
        imageContainer: {
          maxWidth: "100%",
          justifyContent: "start",
        },
      },
    },
  },
  theme
);
