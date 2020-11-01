/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: `all 0.5s ${theme.transitions.easing.easeInOut}`,
    },
    rootFade: {
      backgroundColor: theme.palette.greyBackground.main,
    },
    optionsGrid: {
      width: "100%",
      height: "100%",
    },
    optionContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imageCardButton: {
      maxWidth: "75%",
    },
  })
);
