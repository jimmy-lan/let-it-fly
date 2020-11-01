/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-01
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    userProfileIcon: {
      fontSize: 30,
      height: 28,
      width: 28,
    },
    coinsContainer: {
      height: 48,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: theme.spacing(1.5),
      // color: theme.palette.secondary.light,
    },
    coinIcon: {
      marginRight: theme.spacing(0.8),
    },
    coinsLabel: {
      fontSize: 19,
      // fontWeight: "bold",
      cursor: "default",
    },
    marginBottom: {
      marginBottom: theme.spacing(0.5),
    },
    menuItemIcon: {
      marginRight: theme.spacing(1),
    },
  })
);
