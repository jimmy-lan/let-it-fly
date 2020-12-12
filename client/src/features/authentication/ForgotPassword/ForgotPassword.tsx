/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 * Description: Forgot password page for the app.
 */
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { AuthPageContainer } from "../components/AuthPageContainer";
import { GrayOutArea } from "../components/GridImageCard";
import { useStyles } from "./ForgotPassword.style";
import { TextField, Typography } from "@material-ui/core";
import { ControlButtons } from "../components/ControlButtons";
import { useHistory } from "../../../hooks/useHistory";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  changeEmail,
  setError,
  UserErrorObject,
} from "../../../app/redux/userAuthSlice";
import { useError } from "../hooks";
import { Alert } from "@material-ui/lab";
import { isEmailPattern } from "../../../common/util";
import { requestPassword } from "../../../services/serverApi";

interface OwnProps {}

type Props = OwnProps;

const ForgotPassword: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const email = useSelector((state: RootState) => state.userAuth.email);
  const [isRequestSuccessful, setRequestSuccessful] = useState<
    boolean | undefined
  >(undefined);

  const [validationError] = useError();

  const [isLoading, setLoading] = useState(false);

  const handleResetPasswordClick = async () => {
    setLoading(true);

    // Validate inputs
    let errorObject: UserErrorObject = {};
    errorObject.validation = {};

    if (!isEmailPattern(email)) {
      errorObject.validation.emailField = "Please enter a valid email address.";
    }

    // If no error exists, this clears the error
    dispatch(setError(errorObject));

    if (Object.keys(errorObject.validation).length > 0) {
      setLoading(false);
      return;
    }

    const response = await requestPassword(email);
    setRequestSuccessful(response.success);

    setLoading(false);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeEmail(e.target.value));
  };

  const handleSignInClick = () => {
    history.push("/login");
  };

  return (
    <AuthPageContainer grayOutArea={GrayOutArea.left}>
      <form autoComplete="off" className={classes.forgotPasswordForm}>
        {isRequestSuccessful === false ? (
          <Alert severity="error" className={classes.alertBox}>
            Sorry, we can't process your request at this time.
          </Alert>
        ) : null}
        {isRequestSuccessful ? (
          <Alert severity="success" className={classes.alertBox}>
            Please check your email inbox.
          </Alert>
        ) : null}
        <Typography variant="h6" className={classes.titleText}>
          Forgot your password? No worries.
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          error={!!validationError?.emailField}
          helperText={validationError?.emailField}
          onChange={handleEmailChange}
          className={classes.emailField}
        />
        <Typography variant="body1" className={classes.titleText}>
          An email with a password rest link will be sent to you shortly.
        </Typography>
        <ControlButtons
          primaryButtonText="Reset Password"
          secondaryButtonText="Sign In"
          handlePrimaryButtonClick={handleResetPasswordClick}
          handleSecondaryButtonClick={handleSignInClick}
          isLoading={isLoading}
          isSuccessful={isRequestSuccessful}
        />
      </form>
    </AuthPageContainer>
  );
};

export { ForgotPassword };
