/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 */
import React, { FunctionComponent } from "react";
import ChipInput from "material-ui-chip-input";
import { useStyles } from "./tabPanels.style";
import { FormHeader } from "../FormHeader/FormHeader";
import { Divider, TextField } from "@material-ui/core";
import clsx from "clsx";
import { FormControlButtons } from "../FormControlButtons/FormControlButtons";

interface OwnProps { }

type Props = OwnProps;

const ProfilePanel: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <form autoComplete="off" className={classes.root}>
      <FormHeader title="Self Description" className={classes.formHeader} />
      <TextField
        variant="outlined"
        label="Self Description"
        className={classes.formField}
        fullWidth
        multiline
        rows={6}
      />

      <FormHeader title="Interests" className={classes.formHeader} />
      <ChipInput
        variant="outlined"
        label="Interests"
        value={["Ski", "Make Friends"]}
        className={clsx(classes.chipInput, classes.formField)}
        fullWidth
      />

      <Divider className={classes.divider} />
      <FormControlButtons primaryText="Save" secondaryText="Cancel" />
    </form>
  );
};

export { ProfilePanel };
