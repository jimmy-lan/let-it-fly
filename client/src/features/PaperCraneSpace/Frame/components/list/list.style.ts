/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-05
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";
import { theme } from "../../../../../app/theme";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    noPadding: {
      padding: 0,
    },
    button: {
      textTransform: "initial",
      alignSelf: "flex-start",
      width: "100%",
    },
  })
);

export const redTheme = createMuiTheme({
  // @ts-ignore
  palette: { primary: red },
  typography: theme.typography,
});

export const blueTheme = createMuiTheme({
  // @ts-ignore
  palette: { primary: blue },
  typography: theme.typography,
});
