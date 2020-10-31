/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description:
 *    Provide theme object for the app.
 */
import { createMuiTheme } from "@material-ui/core";
import { deepPurple, orange } from "@material-ui/core/colors";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    greyBackground: Palette["primary"];
  }
  interface PaletteOptions {
    greyBackground: PaletteOptions["primary"];
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple["500"],
    },
    secondary: {
      main: orange["A400"],
      dark: "#b26500",
    },
    greyBackground: {
      main: "#eee",
      light: "#f7f7f7",
    },
  },
  typography: {
    fontFamily: [
      "Poppins",
      "Roboto",
      "Helvetica Neue",
      "Segoe UI",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
});
