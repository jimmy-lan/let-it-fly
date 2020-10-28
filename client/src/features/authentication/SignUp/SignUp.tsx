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
import { GrayOutArea } from "../components/GridImageCard";
import { useHistory } from "../../../hooks/useHistory";
import { ControlButtons } from "../components/ControlButtons";

interface OwnProps {}

type Props = OwnProps;

const SignUp: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleSignInClick = () => {
    history.push("/login");
  };

  return (
    <AuthPageContainer grayOutArea={GrayOutArea.right}>
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
        <ControlButtons
          primaryButtonText="Sign Up to Let It Fly"
          primaryButtonTextMobile="Sign Up"
          secondaryButtonText="Sign In"
          handleSecondaryButtonClick={handleSignInClick}
        />
      </form>
    </AuthPageContainer>
  );
};

export { SignUp };
