/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 * Description: Sign up page for the app.
 */

import React, { FunctionComponent, useState } from "react";
import { AuthPageContainer } from "../components/AuthPageContainer";
import { useStyles } from "./SignUp.style";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { GrayOutArea } from "../components/GridImageCard";
import { useHistory } from "../../../hooks/useHistory";
import { ControlButtons } from "../components/ControlButtons";

interface OwnProps {}

type Props = OwnProps;

const SignUp: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [isAgreeUserAgreement, setAgreeUserAgreement] = useState(false);

  const handleSignInClick = () => {
    history.push("/login");
  };

  const handleUserAgreementCheckboxClick = () => {
    setAgreeUserAgreement(!isAgreeUserAgreement);
  };

  return (
    <AuthPageContainer grayOutArea={GrayOutArea.right}>
      <form autoComplete="off" className={classes.signUpForm}>
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          className={classes.emailField}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          className={classes.passwordField}
        />
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          className={classes.confirmPasswordField}
        />
        <FormControlLabel
          control={<Checkbox checked={isAgreeUserAgreement} />}
          label="I have read and agree to User Agreement."
          className={classes.userAgreementCheckbox}
          onClick={handleUserAgreementCheckboxClick}
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
