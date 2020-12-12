/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 * Description: Sign up page for the app.
 */

import React, { ChangeEvent, FunctionComponent, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Alert } from "@material-ui/lab";

import { AuthPageContainer } from "../components/AuthPageContainer";
import { useStyles } from "./SignUp.style";
import { GrayOutArea } from "../components/GridImageCard";
import { useHistory } from "../../../hooks/useHistory";
import { ControlButtons } from "../components/ControlButtons";
import { RootState, store } from "../../../app/store";
import {
  authenticateAsync,
  changeEmail,
  setError,
  UserErrorObject,
} from "../../../app/redux/userAuthSlice";
import { useError } from "../hooks";
import { isEmailPattern, isEqual } from "../../../common/util";
import { signUp } from "../../../services/serverApi";

interface OwnProps {}

type Props = OwnProps;

const SignUp: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // location where the user was redirected from
  const { state } = useLocation<{ from: string }>();

  // User email is sent to redux store because this syncs the email across
  // different authentication pages: SignIn, SignUp, and ForgotPassword
  const email = useSelector((state: RootState) => state.userAuth.email);
  // User password is kept in state but not sent to redux store because
  // (1) I don't want passwords to be persisted during the entire browsing session, and
  // (2) the user should re-enter the password if åhe or she goes to another page.
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [isAgreeUserAgreement, setAgreeUserAgreement] = useState(true);

  const [validationError, serverError] = useError();

  const [isLoading, setLoading] = useState(false);

  const handleSignUpClick = async () => {
    setLoading(true);

    // Validate inputs
    let errorObject: UserErrorObject = {};
    errorObject.validation = {};

    if (!isAgreeUserAgreement) {
      errorObject.validation.agreementField =
        "By using the Let It Fly website, you must agree to User Agreement.";
    }

    if (!email || !isEmailPattern(email)) {
      errorObject.validation.emailField = "Please enter a valid email address.";
    }

    if (!password) {
      errorObject.validation.passwordField = "Please enter a password string.";
    }

    if (!confirmedPassword) {
      errorObject.validation.confirmPasswordField =
        "Please confirm your password.";
    }

    if (!isEqual(password, confirmedPassword)) {
      errorObject.validation.confirmPasswordField =
        "Your passwords do not match.";
    }

    // If no error exists, this clears the error
    dispatch(setError(errorObject));

    if (Object.keys(errorObject.validation).length > 0) {
      setLoading(false);
      return;
    }

    // Sign up user
    await dispatch(authenticateAsync(email, password, signUp));

    setLoading(false);

    if (store.getState().userAuth.error?.server) {
      return;
    }

    console.log("push");

    history.push(state?.from || "/my");
  };

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
        {serverError ? (
          <Alert severity="error" className={classes.alertBox}>
            {serverError}
          </Alert>
        ) : null}
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          error={!!validationError?.emailField}
          helperText={validationError?.emailField}
          value={email}
          onChange={handleEmailChange}
          className={classes.emailField}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          error={!!validationError?.passwordField}
          helperText={validationError?.passwordField}
          onChange={handlePasswordChange}
          className={classes.passwordField}
        />
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          error={!!validationError?.confirmPasswordField}
          helperText={validationError?.confirmPasswordField}
          value={confirmedPassword}
          onChange={handleConfirmedPasswordChange}
          className={classes.confirmPasswordField}
        />
        <FormControl
          error={!!validationError?.agreementField}
          className={classes.userAgreementCheckbox}
        >
          <FormControlLabel
            control={<Checkbox checked={isAgreeUserAgreement} />}
            label="I have read and agree to User Agreement."
            onClick={handleUserAgreementCheckboxClick}
          />
          <FormHelperText>{validationError?.agreementField}</FormHelperText>
        </FormControl>

        <ControlButtons
          primaryButtonText="Sign Up to Let It Fly"
          primaryButtonTextMobile="Sign Up"
          secondaryButtonText="Sign In"
          handlePrimaryButtonClick={handleSignUpClick}
          handleSecondaryButtonClick={handleSignInClick}
          isLoading={isLoading}
        />
      </form>
    </AuthPageContainer>
  );
};

export { SignUp };
