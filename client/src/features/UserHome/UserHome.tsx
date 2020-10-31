/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description: Home page for regular user.
 */
import React, { FunctionComponent } from "react";
import { useStyles } from "./UserHome.style";
import { FeatureContainer } from "../../common/components/FeatureContainer";

interface OwnProps {}

type Props = OwnProps;

const UserHome: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return <FeatureContainer fullHeight>Home</FeatureContainer>;
};

export { UserHome };
