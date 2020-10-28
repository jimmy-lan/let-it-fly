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
import clsx from "clsx";

interface OwnProps extends CardProps {
  imageSrc: string;
  imageAlt?: string;
}

type Props = OwnProps;

const GridImageCard: FunctionComponent<Props> = ({
  children,
  imageSrc,
  imageAlt,
  ...otherProps
}: PropsWithChildren<Props>) => {
  const classes = useStyles();

  return (
    <Card {...otherProps}>
      <Grid container>
        <Grid
          item
          md={7}
          sm={12}
          xs={12}
          className={clsx(classes.container, classes.grayBackgroundContainer)}
        >
          {children}
        </Grid>
        <Hidden smDown>
          <Grid item md={5} className={classes.container}>
            <img className={classes.image} src={imageSrc} alt={imageAlt} />
          </Grid>
        </Hidden>
      </Grid>
    </Card>
  );
};

export { GridImageCard };
