/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#1a2038",
    },
    card: {
      width: "100%",
      maxWidth: 800,
      borderRadius: 12,
      margin: theme.spacing(1),
    },
    container: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(5),
    },
  })
);
