/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-27
 * Description: Sign in page of the app.
 */

import React, { FunctionComponent } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { GridImageCard } from "../components/GridImageCard";
import { useStyles } from "./SignIn.style";
import authenticationImage from "../../../images/authentication-image.jpg";

interface OwnProps {}

type Props = OwnProps;

const SignIn: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <GridImageCard imageSrc={authenticationImage} className={classes.card}>
        <div className={classes.signInFormContainer}>
          <form autoComplete="off" className={classes.signInForm}>
            <TextField label="Email" variant="outlined" />
            <TextField label="Password" variant="outlined" />
            <FormControlLabel
              control={<Checkbox checked={true} />}
              label="I have read and agree to User Agreement."
            />
            <div className={classes.controlsContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.controlsContainerButton}
              >
                Sign In to Enter Application
              </Button>
              <Typography
                variant="body1"
                className={classes.controlsContainerText}
              >
                or
              </Typography>
              <Button className={classes.controlsContainerButton}>
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </GridImageCard>
    </Paper>
  );
};

export { SignIn };
