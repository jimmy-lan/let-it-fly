/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 */
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    controlsContainer: {
      display: "flex",
      alignItem: "center",
      justifyContent: "flex-start",
      marginBottom: theme.spacing(1),
    },
    controlsContainerText: {
      alignSelf: "center",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
    controlsContainerButton: {
      textTransform: "none",
    },
    buttonWrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    loadingProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: -12,
      marginTop: -12,
    },
  })
);
