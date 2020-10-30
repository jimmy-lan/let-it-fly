/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-24
 */

import React from "react";

import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { AppRouter } from "../common";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
