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
      padding: theme.spacing(2),
    },
    optionsGrid: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(2),
    },
    optionContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imageCardButton: {
      maxWidth: 450,
    },
  })
);
