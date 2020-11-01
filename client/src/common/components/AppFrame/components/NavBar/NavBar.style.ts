/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-01
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navBarIconButton: {
      marginRight: theme.spacing(2),
    },
  })
);
