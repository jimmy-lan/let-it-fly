/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description:
 *    Provide theme object for the app.
 */
import { createMuiTheme } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
  },
});
