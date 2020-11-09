/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      background: "transparent",
      padding: theme.spacing(3),
      width: "100%",
      height: theme.settings.fullHeight,
    },
    list: {
      width: 210,
      padding: 0,
      marginRight: theme.spacing(1.5),
    },
    listItem: {
      height: 48,
    },
    noPadding: {
      padding: 0,
    },
  })
);
