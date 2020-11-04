/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 */
import React, { FunctionComponent } from "react";
import { Divider, TextField } from "@material-ui/core";
import { FormControlButtons } from "../FormControlButtons/FormControlButtons";
import { useStyles } from "./tabPanels.style";
import { FormHeader } from "../FormHeader/FormHeader";
import { FormDisabledEmailField } from "../FormDisabledEmailField/FormDisabledEmailField";

interface OwnProps {}

type Props = OwnProps;

const ContactInfoPanel: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <form autoComplete="off" className={classes.root}>
      <FormHeader title="Contact Information" />
      <FormDisabledEmailField className={classes.formField} />
      <TextField
        variant="outlined"
        label="Telephone"
        className={classes.formField}
        fullWidth
      />
      <Divider className={classes.divider} />
      <FormControlButtons primaryText="Save" secondaryText="Cancel" />
    </form>
  );
};

export { ContactInfoPanel };
