/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-31
 * Description: A clickable card with image and description.
 */
import React, { FunctionComponent } from "react";
import { useStyles } from "./AnimatedImageCardButton.style";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";

interface OwnProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  className?: string;
}

type Props = OwnProps;

const AnimatedImageCardButton: FunctionComponent<Props> = ({
  imageSrc,
  imageAlt,
  title,
  className,
}: Props) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)}>
      {/*Span elements for animation purposes*/}
      <span />
      <span />
      <span />
      <span />

      <CardActionArea>
        <CardMedia
          component="img"
          alt={imageAlt}
          className={classes.image}
          image={imageSrc}
          title={imageAlt}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export { AnimatedImageCardButton };
