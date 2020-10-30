/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 */

import { Link as ReactRouterLink } from "react-router-dom";

import React, { FunctionComponent } from "react";
import { createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface OwnProps {
  to: string;
}

type Props = OwnProps;

const useStyles = makeStyles(
  createStyles({
    root: {
      textDecoration: "none",
    },
  })
);

const Link: FunctionComponent<Props> = (props) => {
  const { to, children } = props;
  const classes = useStyles();
  return (
    <ReactRouterLink to={to} className={classes.root}>
      {children}
    </ReactRouterLink>
  );
};

export { Link };
