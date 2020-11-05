/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-05
 */
import React, { FunctionComponent } from "react";
import { useStyles } from "./SpaceInbox.style";

interface OwnProps {}

type Props = OwnProps;

const SpaceInbox: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>Inbox</div>
    </div>
  );
};

export { SpaceInbox };
