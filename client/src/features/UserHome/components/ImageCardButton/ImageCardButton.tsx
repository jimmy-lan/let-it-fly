/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-31
 * Description: A clickable card with image and description.
 */
import React, { FunctionComponent } from "react";
import { useStyles } from "./ImageCardButton.style";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

interface OwnProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  onClick?: () => void;
  className?: string;
}

type Props = OwnProps;

const ImageCardButton: FunctionComponent<Props> = ({
  imageSrc,
  imageAlt,
  title,
  onClick,
  className,
}: Props) => {
  const classes = useStyles();
  return (
    <Card className={className} onClick={onClick}>
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

export { ImageCardButton };
