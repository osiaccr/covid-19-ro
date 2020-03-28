import React from "react";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import deepOrange from "@material-ui/core/colors/deepOrange";

import HomeProvider from "./components/HomeProvider";

function App() {
  let theme = createMuiTheme({
    palette: {
      primary: deepOrange,
      secondary: green,
      type: "dark"
    }
  });
  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomeProvider />
    </ThemeProvider>
  );
}

export default App;
