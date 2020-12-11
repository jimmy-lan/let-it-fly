/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-11
 */

import React, { FunctionComponent } from "react";
import { MonetizationOn as CoinIcon } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { formatNumber } from "../../../../util";
import { useStyles } from "./UserToolBar.style";

interface OwnProps {}

type Props = OwnProps;

const CoinsContainer: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.coinsContainer}>
      <CoinIcon className={classes.coinIcon} />
      <Typography variant="subtitle1" className={classes.coinsLabel}>
        {formatNumber(coins!)}
      </Typography>
    </div>
  );
};

export { CoinsContainer };
