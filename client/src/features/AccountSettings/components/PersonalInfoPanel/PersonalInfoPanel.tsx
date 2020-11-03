/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import React, { FunctionComponent } from "react";
import { useStyles } from "./PersonalInfoPanel.style";

interface OwnProps {}

type Props = OwnProps;

const PersonalInfoPanel: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return <div className={classes.root}>Personal Info</div>;
};

export { PersonalInfoPanel };
