/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-27
 * Description:
 *    A card component with grid showing an image on the right with bigger screens,
 *    and showing an image on the top with smaller screens.
 */

import React, { FunctionComponent, PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  Grid,
  CardProps,
  GridSpacing,
} from "@material-ui/core";

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
  return (
    <Card {...otherProps}>
      <CardContent>
        <Grid container spacing={gridSpacing ? gridSpacing : 2}>
          <Grid item md={7}>
            {children}
          </Grid>
          <Grid item md={5}>
            <img src={imageSrc} alt={imageAlt} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { GridImageCard };
