/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 */
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    forgotPasswordForm: {
      display: "flex",
      alignItem: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
    },
    titleText: {
      marginBottom: theme.spacing(2),
    },
    emailField: {
      width: "100%",
      marginBottom: theme.spacing(2.5),
    },
    alertBox: {
      marginBottom: theme.spacing(2),
    },
  })
);
