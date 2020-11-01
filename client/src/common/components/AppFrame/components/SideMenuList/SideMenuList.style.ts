/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    menuItem: {
      paddingLeft: theme.spacing(2.7),
      height: theme.spacing(9),
    },
  })
);
