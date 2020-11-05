/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 */
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";
import { theme } from "../../app/theme";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      padding: theme.spacing(3),
      width: "100%",
    },
    list: {
      width: 210,
      padding: 0,
      marginRight: theme.spacing(1.5),
    },
    listItem: {
      height: 48,
    },
    content: {
      flex: 1,
      width: "100%",
    },
    button: {
      textTransform: "initial",
      alignSelf: "flex-start",
      width: "100%",
    },
    noPadding: {
      padding: 0,
    },
  })
);

export const redTheme = createMuiTheme({
  palette: { primary: red },
  typography: theme.typography,
});

export const blueTheme = createMuiTheme({
  palette: { primary: blue },
  typography: theme.typography,
});
