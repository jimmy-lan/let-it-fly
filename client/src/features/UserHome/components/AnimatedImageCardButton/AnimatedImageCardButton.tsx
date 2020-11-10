/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-31
 * Description: A clickable card with image and description.
 */
import React, { FunctionComponent, useState } from "react";
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
  /**
   * Determine whether the card should fade.
   * This image card will fade if shouldFade is set to
   * true AND it's not being hovered over.
   * This prop was created for animation purposes.
   * Default to false.
   */
  shouldFade?: boolean;
  /**
   * Callback function when mouse enters the component.
   */
  onMouseEnter?: () => void;
  /**
   * Callback function when mouse leaves the component.
   */
  onMouseLeave?: () => void;
  onClick?: () => void;
}

type Props = OwnProps;

const AnimatedImageCardButton: FunctionComponent<Props> = ({
  imageSrc,
  imageAlt,
  title,
  className,
  shouldFade,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: Props) => {
  const classes = useStyles();
  const [isHover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
    if (onMouseEnter) {
      onMouseEnter();
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

  return (
    <div
      className={clsx(classes.root, className, {
        [classes.rootHovered]: isHover,
        [classes.fade]: shouldFade && !isHover,
      })}
    >
      {/*Span elements for animation purposes*/}
      <span className={classes.topSpan} />
      <span className={classes.rightSpan} />
      <span className={classes.bottomSpan} />
      <span className={classes.leftSpan} />
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes.card}
        onClick={onClick}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt={imageAlt}
            className={classes.image}
            image={imageSrc}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" gutterBottom className={classes.title}>
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export { AnimatedImageCardButton };
