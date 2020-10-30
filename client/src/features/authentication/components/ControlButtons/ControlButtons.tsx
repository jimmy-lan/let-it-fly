/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 * Description:
 *    Control buttons container for authentication pages.
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import {
  Button,
  Hidden,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "../../../../common/components/RouteComponents";
import { useStyles } from "./ControlButtons.style";

interface OwnProps {
  primaryButtonText: string;
  primaryButtonTextMobile?: string;
  secondaryButtonText: string;
  secondaryButtonTextMobile?: string;
  handlePrimaryButtonClick?: () => void;
  handleSecondaryButtonClick?: () => void;
  isLoading?: boolean;
}

type Props = OwnProps;

const ControlButtons: FunctionComponent<Props> = ({
  primaryButtonText,
  primaryButtonTextMobile,
  secondaryButtonText,
  secondaryButtonTextMobile,
  handlePrimaryButtonClick,
  handleSecondaryButtonClick,
  isLoading,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  return (
    <div className={classes.controlsContainer}>
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classes.controlsContainerButton}
          disabled={isLoading}
          onClick={handlePrimaryButtonClick}
        >
          <Hidden smDown>{primaryButtonText}</Hidden>
          <Hidden mdUp>
            {primaryButtonTextMobile
              ? primaryButtonTextMobile
              : primaryButtonText}
          </Hidden>
        </Button>
        {isLoading && (
          <CircularProgress size={24} className={classes.loadingProgress} />
        )}
      </div>
      <Typography variant="body1" className={classes.controlsContainerText}>
        or
      </Typography>
      <Button
        className={classes.controlsContainerButton}
        disabled={isLoading}
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
