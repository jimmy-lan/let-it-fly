/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description: Home page for regular user.
 */
import React, { FunctionComponent } from "react";
import { useStyles } from "./UserHome.style";
import { Paper } from "@material-ui/core";

interface OwnProps {}

type Props = OwnProps;

const UserHome: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      Home
    </Paper>
  );
};

export { UserHome };
