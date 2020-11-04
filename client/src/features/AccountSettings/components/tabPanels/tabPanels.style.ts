/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    formField: {
      marginBottom: theme.spacing(2.5),
    },
    divider: {
      marginBottom: theme.spacing(1),
    },
    dateField: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(3.9),
    },
  })
);
