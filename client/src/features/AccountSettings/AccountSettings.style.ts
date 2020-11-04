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
      alignItems: "center",
      justifyContent: "flex-start",
    },
    avatarButton: {
      width: 120,
      height: 120,
      // margin: "auto",
      marginLeft: 16,
    },
    tabsContainer: {
      marginTop: theme.spacing(3),
    },
  })
);
