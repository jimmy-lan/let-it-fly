/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
  })
);
