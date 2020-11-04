/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 * Description: div containing one primary and one secondary buttons.
 */
import React, { FunctionComponent } from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "./FormControlButtons.style";
import clsx from "clsx";

interface OwnProps {
  primaryText: string;
  secondaryText: string;
  handlePrimaryButtonClick?: () => void;
  handleSecondaryButtonClick?: () => void;
  className?: string;
}

type Props = OwnProps;

const FormControlButtons: FunctionComponent<Props> = ({
  primaryText,
  secondaryText,
  handlePrimaryButtonClick,
  handleSecondaryButtonClick,
  className,
  ...otherProps
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)} {...otherProps}>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrimaryButtonClick}
        className={classes.button}
      >
        {primaryText}
      </Button>
      <Button onClick={handleSecondaryButtonClick} className={classes.button}>
        {secondaryText}
      </Button>
    </div>
  );
};

export { FormControlButtons };
