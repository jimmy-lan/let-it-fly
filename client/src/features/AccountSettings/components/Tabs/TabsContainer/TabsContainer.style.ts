/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    tab: {
      textTransform: "initial",
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
