/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 */
import React, { FunctionComponent } from "react";
import { useStyles } from "./tabPanels.style";
import { FormDisabledEmailField } from "../FormDisabledEmailField/FormDisabledEmailField";
import { FormHeader } from "../FormHeader/FormHeader";
import { TextField, Divider } from "@material-ui/core";
import { FormControlButtons } from "../FormControlButtons/FormControlButtons";

interface OwnProps {}

type Props = OwnProps;

const AuthenticationPanel: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <form autoComplete="off" className={classes.root}>
      <FormHeader title="Update Credentials" className={classes.formHeader} />
      <FormDisabledEmailField hideButton className={classes.formField} />
      <TextField
        variant="outlined"
        label="Old Password"
        type="password"
        className={classes.formField}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="New Password"
        type="password"
        className={classes.formField}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Confirm New Password"
        type="password"
        className={classes.formField}
        fullWidth
      />
      <Divider className={classes.divider} />
      <FormControlButtons
        primaryText="Update Credentials"
        secondaryText="Cancel"
      />
    </form>
  );
};

export { AuthenticationPanel };
