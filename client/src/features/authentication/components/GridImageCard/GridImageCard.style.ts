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
      backgroundColor: "#eeeeee",
      width: "100%",
    },
    image: {
      width: 200,
    },
  })
);
