/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-27
 * Description: Sign in page of the app.
 */

import React, { FunctionComponent } from "react";
import { createStyles, Paper, Theme } from "@material-ui/core";
import { GridImageCard } from "../components/GridImageCard";
import { makeStyles } from "@material-ui/core/styles";
import { useStyles } from "./SignIn.style";

interface OwnProps {}

type Props = OwnProps;

const SignIn: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <GridImageCard
        imageSrc="https://via.placeholder.com/150"
        className={classes.card}
      />
    </Paper>
  );
};

export { SignIn };
