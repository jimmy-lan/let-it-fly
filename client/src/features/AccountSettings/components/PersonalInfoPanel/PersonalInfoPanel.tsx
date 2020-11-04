/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import React, { FunctionComponent, useState } from "react";
import { useStyles } from "./PersonalInfoPanel.style";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Divider,
  Container,
} from "@material-ui/core";
import { InfoOutlined as InfoIcon } from "@material-ui/icons";
import { FormHeader } from "../FormHeader/FormHeader";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { FormControlButtons } from "../FormControlButtons/FormControlButtons";

interface OwnProps {}

type Props = OwnProps;

const PersonalInfoPanel: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [birthdate, setBirthdate] = useState<Date | null>(new Date());

  const handleBirthdayChange = (date: Date | null) => {
    setBirthdate(date);
  };

  return (
    <form autoComplete="off" className={classes.root}>
      <FormHeader title="Basic Information" />
      <Grid container spacing={3} className={classes.formField}>
        <Grid item md={6} sm={12} xs={12}>
          <TextField label="First Name" variant="outlined" fullWidth required />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField label="Last Name" variant="outlined" fullWidth required />
        </Grid>
      </Grid>
      <FormControl
        disabled
        fullWidth
        variant="outlined"
        className={classes.formField}
      >
        <InputLabel htmlFor="outlined-email-field">Email Address</InputLabel>
        <OutlinedInput
          id="outlined-email-field"
          type="email"
          labelWidth={115}
          value="user@user.com"
          endAdornment={
            <InputAdornment position="end">
              <Button>Update Credentials</Button>
            </InputAdornment>
          }
        />
        <div className={classes.infoHelperContainer}>
          <InfoIcon className={classes.helperIcon} />
          <FormHelperText className={classes.infoHelperText}>
            In this version of Let It Fly app, you cannot update your email
            address after sign up.
          </FormHelperText>
        </div>
      </FormControl>

      <FormHeader title="More About You" />
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Date of Birth"
        format="MM/dd/yyyy"
        value={birthdate}
        inputVariant="outlined"
        fullWidth
        onChange={handleBirthdayChange}
        className={classes.birthdateField}
      />
      <Grid container spacing={3} className={classes.formField}>
        <Grid item md={6} sm={12} xs={12}>
          <TextField label="City" variant="outlined" fullWidth />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField label="Region" variant="outlined" fullWidth />
        </Grid>
      </Grid>
      <TextField
        variant="outlined"
        label="Occupation"
        fullWidth
        className={classes.formField}
      />
      <Divider className={classes.divider} />
      <FormControlButtons primaryText="Save" secondaryText="Cancel" />
    </form>
  );
};

export { PersonalInfoPanel };
