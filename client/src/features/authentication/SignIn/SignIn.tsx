/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-27
 * Description: Sign in page of the app.
 */

import React, { FunctionComponent } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Hidden,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { GridImageCard } from "../components/GridImageCard";
import { useStyles } from "./SignIn.style";
import authenticationImage from "../../../images/authentication-image.jpg";
import clsx from "clsx";
import { Link } from "../../../common";
import { AuthPageContainer } from "../components/AuthPageContainer";

interface OwnProps {}

type Props = OwnProps;

const SignIn: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <AuthPageContainer>
      <form autoComplete="off" className={classes.signInForm}>
        <Hidden smUp>
          <div className={classes.mobileFormHeaderContainer}>
            <Typography variant="h4" className={classes.mobileFormHeader}>
              Let It Fly!
            </Typography>
            <Divider />
          </div>
        </Hidden>
        <TextField
          label="Email"
          variant="outlined"
          className={classes.emailField}
        />
        <TextField
          label="Password"
          variant="outlined"
          className={classes.passwordField}
        />
        <FormControlLabel
          control={<Checkbox checked={true} />}
          label="I have read and agree to User Agreement."
          className={classes.userAgreementCheckbox}
        />
        <div className={classes.controlsContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.controlsContainerButton}
          >
            <Hidden smDown>Sign In to Enter Application</Hidden>
            <Hidden smUp>Sign In</Hidden>
          </Button>
          <Typography variant="body1" className={classes.controlsContainerText}>
            or
          </Typography>
          <Link to="/signup">
            <Button className={classes.controlsContainerButton}>Sign Up</Button>
          </Link>
        </div>
        <div>
          <Button
            color="primary"
            className={clsx(
              classes.forgotPasswordButton,
              classes.controlsContainerButton
            )}
          >
            Forgot your password?
          </Button>
        </div>
      </form>
    </AuthPageContainer>
  );
};

export { SignIn };
