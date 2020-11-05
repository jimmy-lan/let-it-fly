/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-05
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    header: {
      width: "100%",
      height: 48,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  })
);
