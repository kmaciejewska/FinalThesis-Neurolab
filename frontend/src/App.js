import React from "react";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import { theme } from "./assets/global/Theme";
import { useRoutes } from "react-router";
import Router from "./routes/Router";

export default function App() {
  React.useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const routes = useRoutes(Router());
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routes}
    </ThemeProvider>
  );
}
