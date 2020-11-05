/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItem: "center",
      justifyContent: "flex-start",
    },
    button: {
      textTransform: "initial",
      marginRight: theme.spacing(1.5),
    },
  })
);
