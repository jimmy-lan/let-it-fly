/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageInput: {
      display: "none",
    },
    iconButton: {
      width: "100%",
      height: "100%",
      margin: 0,
    },
    icon: {
      width: "100%",
      height: "100%",
    },
  })
);
