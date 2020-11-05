/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description:
 *    Container for features presented inside of AppFrame.
 *    Provide additional utility for fitting the <main> part of AppFrame.
 */

import React, { FunctionComponent, PropsWithChildren } from "react";
import { Card, CardContent } from "@material-ui/core";
import { useStyles } from "./FeatureContainer.style";
import clsx from "clsx";

interface OwnProps {
  /**
   * Determine whether the container fits entire <main> area
   */
  fullHeight?: boolean;
  className?: string;
}

type Props = OwnProps;

const FeatureContainer: FunctionComponent<Props> = ({
  children,
  fullHeight,
  className,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  return (
    <Card
      className={clsx(className, classes.root, {
        [classes.fullHeightContainer]: fullHeight,
      })}
    >
      <CardContent className={clsx("container", classes.container)}>
        {children}
      </CardContent>
    </Card>
  );
};

export { FeatureContainer };
