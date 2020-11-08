/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(0.5),
    },
    divider: {
      marginBottom: theme.spacing(3),
    },
  })
);
