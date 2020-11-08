/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    tabs: {
      marginBottom: theme.spacing(2.5),
    },
    tab: {
      textTransform: "initial",
      fontSize: 16,
      paddingLeft: 0,
      "&:hover": {
        color: theme.palette.secondary.main,
      },
      "&:focus": {
        color: theme.palette.secondary.main,
      },
    },
    indicator: {
      backgroundColor: theme.palette.secondary.main,
    },
  })
);
