/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-24
 */

import React from "react";

import { AppFrame } from "../common/components";
import { CssBaseline, Typography } from "@material-ui/core";
import { AppRouter } from "../common/components/AppRouter/AppRouter";

function App() {
  return (
    <>
      <CssBaseline />
      <AppRouter />
    </>
  );
}

export default App;
