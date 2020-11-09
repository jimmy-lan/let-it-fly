import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: `all 0.5s ${theme.transitions.easing.easeInOut}`,
      height: "100%",
      marginBottom: "10px",
    },
    rootFade: {
      backgroundColor: theme.palette.greyBackground.main,
    },
    optionsGrid: {
      top: "50%",
      width: "100%",
      display: "inline-block",
    },
    optionContainer: {
      display: "inline-block",
      justifyContent: "center",

      alignItems: "center",
      width: "25%",
    },
    imageCardButton: {
      width: "100%",
      height: "100%",
      display: "inline-block",
    },
  })
);
