/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description:
 *    Container for features presented inside of AppFrame.
 *    Provide additional utility for fitting the <main> part of AppFrame.
 */

import React, { FunctionComponent, PropsWithChildren } from "react";
import { Paper } from "@material-ui/core";
import { useStyles } from "./FeatureContainer.style";
import clsx from "clsx";

interface OwnProps {
  /**
   * Determine whether the container fits entire <main> area
   */
  fullHeight?: boolean;
}

type Props = OwnProps;

const FeatureContainer: FunctionComponent<Props> = ({
  children,
  fullHeight,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  return (
    <Paper
      elevation={0}
      className={clsx(classes.root, {
        [classes.fullHeightContainer]: fullHeight,
      })}
    >
      {children}
    </Paper>
  );
};

export { FeatureContainer };
