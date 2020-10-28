/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-27
 * Description:
 *    A card component with grid showing an image on the right with bigger screens,
 *    and hiding the image with smaller screens sizes.
 */

import React, { FunctionComponent, PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  Grid,
  CardProps,
  GridSpacing,
  Hidden,
} from "@material-ui/core";
import { useStyles } from "./GridImageCard.style";

interface OwnProps extends CardProps {
  imageSrc: string;
  imageAlt?: string;
  gridSpacing?: GridSpacing;
}

type Props = OwnProps;

const GridImageCard: FunctionComponent<Props> = ({
  children,
  imageSrc,
  imageAlt,
  gridSpacing,
  ...otherProps
}: PropsWithChildren<Props>) => {
  const classes = useStyles();

  return (
    <Card {...otherProps}>
      <Grid container spacing={gridSpacing ? gridSpacing : 3}>
        <Grid item md={7} sm={12} xs={12}>
          {children}
        </Grid>
        <Hidden smDown>
          <Grid item md={5} className={classes.imageContainer}>
            <img src={imageSrc} alt={imageAlt} />
          </Grid>
        </Hidden>
      </Grid>
    </Card>
  );
};

export { GridImageCard };
