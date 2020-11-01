/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-01
 * Description:
 *    Toolbar to display user avatar, coins remaining, and
 *    notifications icon button.
 */
import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { Avatar, Badge, IconButton, Typography } from "@material-ui/core";
import {
  AccountCircleTwoTone as AccountIcon,
  Notifications as NotificationsIcon,
  MonetizationOn as CoinIcon,
} from "@material-ui/icons";
import { useStyles } from "./UserToolBar.style";
import { formatNumber } from "../../../../util";

interface OwnProps {}

type Props = OwnProps;

const UserToolBar: FunctionComponent<Props> = (props) => {
  const { avatarLink, coins } = useSelector(
    (state: RootState) => state.userAuth
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.coinsContainer}>
        <CoinIcon className={classes.coinIcon} />
        <Typography variant="subtitle1" className={classes.coinsLabel}>
          {formatNumber(coins!)}
        </Typography>
      </div>
      <IconButton color="inherit">
        <Badge badgeContent={17} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton color="inherit">
        {avatarLink ? (
          <Avatar
            alt="avatar"
            src={avatarLink}
            className={classes.userProfileIcon}
          />
        ) : (
          <AccountIcon className={classes.userProfileIcon} />
        )}
      </IconButton>
    </div>
  );
};

export { UserToolBar };
