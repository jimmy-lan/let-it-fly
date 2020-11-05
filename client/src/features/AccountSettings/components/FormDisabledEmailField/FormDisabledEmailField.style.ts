/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    disabled: {
      color: theme.palette.text.disabled,
    },
    helperIcon: {
      fontSize: 14,
    },
    infoHelperContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: theme.spacing(0.3),
    },
    infoHelperText: {
      marginLeft: theme.spacing(0.6),
      marginTop: 0,
    },
  })
);
