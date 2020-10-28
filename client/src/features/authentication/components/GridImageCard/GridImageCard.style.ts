import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  createStyles({
    container: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    grayBackgroundContainer: {
      width: "100%",
      background: "#eeeeee",
    },
    image: {
      width: 240,
    },
  })
);
