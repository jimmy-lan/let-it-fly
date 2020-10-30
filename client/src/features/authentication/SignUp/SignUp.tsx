/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 * Description: Sign up page for the app.
 */

import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { AuthPageContainer } from "../components/AuthPageContainer";
import { useStyles } from "./SignUp.style";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { GrayOutArea } from "../components/GridImageCard";
import { useHistory } from "../../../hooks/useHistory";
import { ControlButtons } from "../components/ControlButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { changeEmail } from "../userSlice";

interface OwnProps {}

type Props = OwnProps;

const SignUp: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // User email is sent to redux store because this syncs the email across
  // the different authentication pages: SignIn, SignUp, and ForgotPassword
  const email = useSelector((state: RootState) => state.userAuth.email);
  // User password is kept in state but not sent to redux store because
  // (1) I don't want passwords to be persisted across browsing session, and
  // (2) passwords should be page-specific, this means the user should re-enter the password if
  // he or she goes to another page.
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  const [isAgreeUserAgreement, setAgreeUserAgreement] = useState(true);

  const handleSignInClick = () => {
    history.push("/login");
  };

  const handleUserAgreementCheckboxClick = () => {
    setAgreeUserAgreement(!isAgreeUserAgreement);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeEmail(e.target.value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmedPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(e.target.value);
  };

  return (
    <AuthPageContainer grayOutArea={GrayOutArea.right}>
      <form autoComplete="off" className={classes.signUpForm}>
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={classes.emailField}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className={classes.passwordField}
        />
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          value={confirmedPassword}
          onChange={handleConfirmedPasswordChange}
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
