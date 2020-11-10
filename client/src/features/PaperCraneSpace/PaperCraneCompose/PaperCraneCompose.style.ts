/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(3),
    },
    formField: {
      marginBottom: theme.spacing(2.5),
    },
    controlButtons: {
      width: "100%",
      marginTop: theme.spacing(0.5),
    },
  })
);
