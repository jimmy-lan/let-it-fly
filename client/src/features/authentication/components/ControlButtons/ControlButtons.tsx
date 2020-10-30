/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 * Description:
 *    Control buttons container for authentication pages.
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import { Button, Hidden, Typography } from "@material-ui/core";
import { Link } from "../../../../common/components/RouteComponents";
import { useStyles } from "./ControlButtons.style";

interface OwnProps {
  primaryButtonText: string;
  primaryButtonTextMobile?: string;
  secondaryButtonText: string;
  secondaryButtonTextMobile?: string;
  handlePrimaryButtonClick?: () => void;
  handleSecondaryButtonClick?: () => void;
}

type Props = OwnProps;

const ControlButtons: FunctionComponent<Props> = ({
  primaryButtonText,
  primaryButtonTextMobile,
  secondaryButtonText,
  secondaryButtonTextMobile,
  handlePrimaryButtonClick,
  handleSecondaryButtonClick,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  return (
    <div className={classes.controlsContainer}>
      <Button
        variant="contained"
        color="primary"
        className={classes.controlsContainerButton}
        onClick={handlePrimaryButtonClick}
      >
        <Hidden smDown>{primaryButtonText}</Hidden>
        <Hidden mdUp>
          {primaryButtonTextMobile
            ? primaryButtonTextMobile
            : primaryButtonText}
        </Hidden>
      </Button>
      <Typography variant="body1" className={classes.controlsContainerText}>
        or
      </Typography>
      <Button
        className={classes.controlsContainerButton}
        onClick={handleSecondaryButtonClick}
      >
        <Hidden smDown>{secondaryButtonText}</Hidden>
        <Hidden mdUp>
          {secondaryButtonTextMobile
            ? secondaryButtonTextMobile
            : secondaryButtonText}
        </Hidden>
      </Button>
    </div>
  );
};

export { ControlButtons };
