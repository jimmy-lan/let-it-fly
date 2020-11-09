/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import { Typography } from "@material-ui/core";

import { FeatureContainer } from "../../../../common/components/FeatureContainer";
import { useStyles } from "./FeatureContainerWithHeader.style";

interface OwnProps {}

type Props = OwnProps;

const FeatureContainerWithHeader: FunctionComponent<Props> = ({
  children,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();

  return (
    <FeatureContainer className={classes.root}>
      <div className={classes.header}>
        <Typography variant="subtitle1">Inbox</Typography>
      </div>
      {children}
    </FeatureContainer>
  );
};

export { FeatureContainerWithHeader };
