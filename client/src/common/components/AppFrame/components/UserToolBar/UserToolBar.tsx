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
import { Avatar, IconButton } from "@material-ui/core";
import { AccountCircleTwoTone as AccountIcon } from "@material-ui/icons";

interface OwnProps {}

type Props = OwnProps;

const UserToolBar: FunctionComponent<Props> = (props) => {
  const { avatarLink, coins } = useSelector(
    (state: RootState) => state.userAuth
  );
  return (
    <div>
      <IconButton color="inherit">
        {avatarLink ? (
          <Avatar alt="avatar" src={avatarLink} />
        ) : (
          <AccountIcon />
        )}
      </IconButton>
    </div>
  );
};

export { UserToolBar };
