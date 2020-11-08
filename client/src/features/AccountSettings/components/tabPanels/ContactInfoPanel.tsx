/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 */
import React, { FunctionComponent } from "react";
import { Divider, TextField, Typography } from "@material-ui/core";
import { FormControlButtons } from "../FormControlButtons/FormControlButtons";
import { useStyles } from "./tabPanels.style";
import { FormHeader } from "../FormHeader/FormHeader";
import { FormDisabledEmailField } from "../FormDisabledEmailField/FormDisabledEmailField";
import clsx from "clsx";

interface OwnProps {}

type Props = OwnProps;

const ContactInfoPanel: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <form autoComplete="off" className={classes.root}>
      <FormHeader title="Contact Information" className={classes.formHeader} />
      <FormDisabledEmailField
        label="Primary Email"
        className={classes.formField}
      />
      <TextField
        variant="outlined"
        label="Secondary Email"
        className={classes.formField}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Telephone"
        className={classes.formField}
        fullWidth
      />

      <FormHeader title="Social Media" className={classes.smallMarginBelow} />
      <Typography
        variant="body1"
        className={clsx(classes.formField, classes.hintText)}
      >
        Paste in your social media links so others can find you!
      </Typography>
      <TextField
        variant="outlined"
        label="Facebook"
        className={classes.formField}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Linked In"
        className={classes.formField}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Tweeter"
        className={classes.formField}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Youtube"
        className={classes.formField}
        fullWidth
      />

      <FormHeader title="Other" className={classes.formHeader} />
      <TextField
        variant="outlined"
        label="Github"
        className={classes.formField}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Website"
        className={classes.formField}
        fullWidth
      />
      <Divider className={classes.divider} />
      <FormControlButtons primaryText="Save" secondaryText="Cancel" />
    </form>
  );
};

export { ContactInfoPanel };
