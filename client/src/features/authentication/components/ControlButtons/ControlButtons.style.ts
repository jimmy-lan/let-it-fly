/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 */
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

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
      position: "relative",
    },
    loadingProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: -12,
      marginTop: -12,
    },
    iconSuccess: {
      marginRight: theme.spacing(0.6),
    },
    buttonSuccess: {
      backgroundColor: green["500"],
      "&:hover": {
        backgroundColor: green["700"],
      },
    },
  })
);
