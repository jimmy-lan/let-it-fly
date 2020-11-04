/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
);
