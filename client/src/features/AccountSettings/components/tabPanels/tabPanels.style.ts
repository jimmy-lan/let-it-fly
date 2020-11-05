/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    formField: {
      marginBottom: theme.spacing(2.5),
    },
    /** Form field with more space */
    spaceFormField: {
      marginBottom: theme.spacing(3.5),
    },
    formHeader: {
      marginBottom: theme.spacing(3),
    },
    divider: {
      marginBottom: theme.spacing(1),
    },
    hintText: {
      color: theme.palette.text.hint,
    },
    dateField: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(3.9),
    },
    smallMarginBelow: {
      marginBottom: theme.spacing(0.9),
    },
    chipInput: {
      "& .WAMuiChipInput-inputRoot-72": {
        /** Adjust weired padding space that comes with
         * material-ui-chip-input component */
        paddingBottom: 5,
      },
    },
  })
);
