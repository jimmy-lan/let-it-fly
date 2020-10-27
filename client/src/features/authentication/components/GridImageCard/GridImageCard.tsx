/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-27
 * Description:
 *    A card component with grid showing an image on the right with bigger screens,
 *    and showing an image on the top with smaller screens.
 */

import React, { FunctionComponent, PropsWithChildren } from "react";
import { Card, CardContent, Grid } from "@material-ui/core";

interface OwnProps {
  imageSrc: string;
  imageAlt?: string;
}

type Props = OwnProps;

const GridImageCard: FunctionComponent<Props> = ({
  children,
  imageSrc,
  imageAlt,
}: PropsWithChildren<Props>) => {
  return (
    <Card>
      <CardContent>
        <Grid container>
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
