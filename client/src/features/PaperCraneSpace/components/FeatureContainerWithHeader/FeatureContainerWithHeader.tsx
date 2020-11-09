/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import { Typography } from "@material-ui/core";

import { FeatureContainer } from "../../../../common/components/FeatureContainer";
import { useStyles } from "./FeatureContainerWithHeader.style";

interface OwnProps {
  headerTitle: string;
}

type Props = OwnProps;

const FeatureContainerWithHeader: FunctionComponent<Props> = ({
  headerTitle,
  children,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();

  return (
    <FeatureContainer className={classes.root}>
      <div className={classes.header}>
        <Typography variant="subtitle1">{headerTitle}</Typography>
      </div>
      {children}
    </FeatureContainer>
  );
};

export { FeatureContainerWithHeader };
