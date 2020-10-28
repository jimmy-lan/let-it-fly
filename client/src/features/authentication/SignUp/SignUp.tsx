/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 * Description: Sign up page for the app.
 */

import React, { FunctionComponent } from "react";
import { AuthPageContainer } from "../components/AuthPageContainer";
import { useStyles } from "./SignUp.style";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Hidden,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "../../../common/components/RouteComponents";

interface OwnProps {}

type Props = OwnProps;

const SignUp: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return (
    <AuthPageContainer>
      <form autoComplete="off" className={classes.signUpForm}>
        <TextField
          variant="outlined"
          label="Email"
          className={classes.emailField}
        />
        <TextField
          variant="outlined"
          label="Password"
          className={classes.passwordField}
        />
        <TextField
          variant="outlined"
          label="Confirm Password"
          className={classes.confirmPasswordField}
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
            <Hidden smDown>Sign Up to Let It Fly</Hidden>
            <Hidden smUp>Sign Up</Hidden>
          </Button>
          <Typography variant="body1" className={classes.controlsContainerText}>
            or
          </Typography>
          <Link to="/login">
            <Button className={classes.controlsContainerButton}>Sign In</Button>
          </Link>
        </div>
      </form>
    </AuthPageContainer>
  );
};

export { SignUp };
