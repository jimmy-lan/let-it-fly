/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-11
 */

import React, { FunctionComponent, useEffect } from "react";
import { MonetizationOn as CoinIcon } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { formatNumber } from "../../../../util";
import { useStyles } from "./UserToolBar.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { fetchUserCoinsAsync } from "../../../../../app/redux/userPropertySlice";

interface OwnProps {}

type Props = OwnProps;

const CoinsContainer: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { coins } = useSelector(
    (state: RootState) => state.userProperty.property
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserCoinsAsync());
  }, [dispatch, coins]);

  return (
    <div className={classes.coinsContainer}>
      <CoinIcon className={classes.coinIcon} />
      <Typography variant="subtitle1" className={classes.coinsLabel}>
        {coins ? formatNumber(coins) : "--"}
      </Typography>
    </div>
  );
};

export { CoinsContainer };
