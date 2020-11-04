/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import React, { FunctionComponent } from "react";
import { useStyles } from "./PersonalInfoPanel.style";
import {
  Grid,
  TextField,
  Typography,
  Divider,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import { InfoOutlined as InfoIcon } from "@material-ui/icons";

interface OwnProps {}

type Props = OwnProps;

const PersonalInfoPanel: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return (
    <form autoComplete="off" className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Basic Information
      </Typography>
      <Divider className={classes.divider} />
      <Grid container spacing={3} className={classes.formField}>
        <Grid item md={6} sm={12} xs={12}>
          <TextField label="First Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField label="Last Name" variant="outlined" fullWidth />
        </Grid>
      </Grid>
      <FormControl disabled fullWidth variant="outlined">
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
    </form>
  );
};

export { PersonalInfoPanel };
