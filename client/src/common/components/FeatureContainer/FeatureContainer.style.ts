/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2.5),
    },
    container: {
      height: "100%",
      width: "100%",
    },
    fullHeightContainer: {
      minHeight: theme.settings.fullHeight,
    },
  })
);
