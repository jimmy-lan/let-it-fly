/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-27
 * Description: Sign in page of the app.
 */

import React, { FunctionComponent, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
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

interface OwnProps {}

type Props = OwnProps;

const SignIn: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [isAgreeUserAgreement, setAgreeUserAgreement] = useState(false);

  const handleSignUpClick = () => {
    history.push("/signup");
  };

  const handleUserAgreementCheckboxClick = () => {
    setAgreeUserAgreement(!isAgreeUserAgreement);
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
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          className={classes.emailField}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          className={classes.passwordField}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isAgreeUserAgreement}
              onClick={handleUserAgreementCheckboxClick}
            />
          }
          label="I have read and agree to User Agreement."
          className={classes.userAgreementCheckbox}
        />
        <ControlButtons
          primaryButtonText="Sign In to Enter Application"
          primaryButtonTextMobile="Sign In"
          secondaryButtonText="Sign Up"
          handleSecondaryButtonClick={handleSignUpClick}
        />
        <div>
          <Link to="/forgot-password">
            <Button color="primary" className={classes.forgotPasswordButton}>
              Forgot your password?
            </Button>
          </Link>
        </div>
      </form>
    </AuthPageContainer>
  );
};

export { SignIn };
