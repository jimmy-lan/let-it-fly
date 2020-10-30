/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-27
 * Description:
 *    A card component with grid showing an image on the right with bigger screens,
 *    and hiding the image with smaller screens sizes.
 */

import React, { FunctionComponent, PropsWithChildren } from "react";
import { Card, Grid, CardProps, Hidden } from "@material-ui/core";
import { useStyles } from "./GridImageCard.style";
import clsx from "clsx";

interface OwnProps extends CardProps {
  imageSrc: string;
  imageAlt?: string;
  grayOutArea: GrayOutArea;
}

type Props = OwnProps;

export enum GrayOutArea {
  left,
  right,
  none,
}

const GridImageCard: FunctionComponent<Props> = ({
  children,
  imageSrc,
  imageAlt,
  grayOutArea,
  ...otherProps
}: PropsWithChildren<Props>) => {
  const classes = useStyles();

  // classes for left and right grid cell
  const leftClasses = [
    classes.container,
    grayOutArea === GrayOutArea.left ? classes.grayBackgroundContainer : null,
  ];
  const rightClasses = [
    classes.container,
    grayOutArea === GrayOutArea.right ? classes.grayBackgroundContainer : null,
  ];

  return (
    <Card {...otherProps}>
      <Grid container>
        <Grid item md={7} sm={12} xs={12} className={clsx(leftClasses)}>
          {children}
        </Grid>
        <Hidden smDown>
          <Grid item md={5} className={clsx(rightClasses)}>
            <img className={classes.image} src={imageSrc} alt={imageAlt} />
          </Grid>
        </Hidden>
      </Grid>
    </Card>
  );
};

export { GridImageCard };
