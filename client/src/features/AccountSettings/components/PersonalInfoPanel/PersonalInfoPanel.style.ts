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
    birthdateField: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(3.9),
    },
    helperIcon: {
      fontSize: 14,
      color: theme.palette.text.disabled,
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
