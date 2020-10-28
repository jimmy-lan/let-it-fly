/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 * Description: Forgot password page for the app.
 */
import React, { FunctionComponent } from "react";
import { AuthPageContainer } from "../components/AuthPageContainer";
import { GrayOutArea } from "../components/GridImageCard";
import { useStyles } from "./ForgotPassword.style";
import { TextField, Typography } from "@material-ui/core";

interface OwnProps {}

type Props = OwnProps;

const ForgotPassword: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return (
    <AuthPageContainer grayOutArea={GrayOutArea.left}>
      <form autoComplete="off" className={classes.forgotPasswordForm}>
        <Typography variant="h6" className={classes.titleText}>
          Forgot your password? No worries.
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          className={classes.emailField}
        />
        <Typography variant="body1">
          An email with a password rest link will be sent to you shortly.
        </Typography>
      </form>
    </AuthPageContainer>
  );
};

export { ForgotPassword };
