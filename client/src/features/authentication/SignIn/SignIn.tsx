/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-27
 * Description: Sign in page of the app.
 */

import React, { ChangeEvent, FunctionComponent, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Hidden,
  TextField,
  Typography,
} from "@material-ui/core";
import { GrayOutArea } from "../components/GridImageCard";
import { useStyles } from "./SignIn.style";
import { Link } from "../../../common";
import { AuthPageContainer } from "../components/AuthPageContainer";
import { ControlButtons } from "../components/ControlButtons";
import { useHistory } from "../../../hooks/useHistory";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../app/store";
import {
  changeEmail,
  setError,
  UserErrorObject,
  authenticateAsync,
} from "../../../app/redux/userAuthSlice";
import { isEmailPattern } from "../../../common/util";
import { signIn } from "../../../services/serverApi";
import { useLocation } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { useError } from "../hooks";

interface OwnProps {}

type Props = OwnProps;

const SignIn: FunctionComponent<Props> = (props) => {
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
  const [isAgreeUserAgreement, setAgreeUserAgreement] = useState(true);

  const [validationError, serverError] = useError();

  // Determines whether the component is waiting for API response
  const [isLoading, setLoading] = useState(false);

  const handleSignInClick = async () => {
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

    // If no error exists, this clears the error
    dispatch(setError(errorObject));

    if (Object.keys(errorObject.validation).length > 0) {
      setLoading(false);
      return;
    }

    // Sign in user
    await dispatch(authenticateAsync(email, password, signIn));

    setLoading(false);

    if (store.getState().userAuth.error?.server) {
      return;
    }

    history.push(state?.from || "/my");
  };

  const handleSignUpClick = () => {
    history.push("/signup");
  };

  const handleUserAgreementCheckboxClick = () => {
    setAgreeUserAgreement((prevState: boolean) => !prevState);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeEmail(e.target.value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <AuthPageContainer grayOutArea={GrayOutArea.left}>
      <form autoComplete="off" className={classes.signInForm}>
        <Hidden smUp>
          <div className={classes.mobileFormHeaderContainer}>
            <Typography variant="h4" className={classes.mobileFormHeader}>
              Let It Fly!
            </Typography>
            <Divider />
          </div>
        </Hidden>
        {serverError ? (
          <Alert severity="error" className={classes.alertBox}>
            {serverError}
          </Alert>
        ) : null}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          // Display error if validationError?.emailField exists
          error={!!validationError?.emailField}
          helperText={validationError?.emailField}
          value={email}
          onChange={handleEmailChange}
          className={classes.emailField}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          // Display error if validationError?.passwordField exists
          error={!!validationError?.passwordField}
          helperText={validationError?.passwordField}
          value={password}
          onChange={handlePasswordChange}
          className={classes.passwordField}
        />
        <FormControl
          className={classes.userAgreementCheckbox}
          // Display error if validationError?.agreementField exists
          error={!!validationError?.agreementField}
        >
          <FormControlLabel
            control={<Checkbox checked={isAgreeUserAgreement} />}
            label="I have read and agree to User Agreement."
            onClick={handleUserAgreementCheckboxClick}
          />
          <FormHelperText>{validationError?.agreementField}</FormHelperText>
        </FormControl>
        <ControlButtons
          primaryButtonText="Sign In to Enter Application"
          primaryButtonTextMobile="Sign In"
          secondaryButtonText="Sign Up"
          handlePrimaryButtonClick={handleSignInClick}
          handleSecondaryButtonClick={handleSignUpClick}
          isLoading={isLoading}
        />
        <div>
          <Link to="/forgot-password">
            <Button
              color="primary"
              className={classes.forgotPasswordButton}
              disabled={isLoading}
            >
              Forgot your password?
            </Button>
          </Link>
        </div>
      </form>
    </AuthPageContainer>
  );
};

export { SignIn };
