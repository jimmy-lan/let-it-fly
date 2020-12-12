/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-11
 */

import React, { FunctionComponent, RefObject, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AccountCircleTwoTone as AccountIcon } from "@material-ui/icons";
import { useStyles } from "./UserToolBar.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { fetchUserAvatarAsync } from "../../../../../app/redux/userProfileSlice";

interface OwnProps {
  onClick?: () => void;
  menuRef?: RefObject<HTMLButtonElement>;
}

type Props = OwnProps;

const AvatarButton: FunctionComponent<Props> = ({
  onClick,
  menuRef,
}: Props) => {
  const classes = useStyles();

  const { avatar } = useSelector(
    (state: RootState) => state.userProfile.profile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAvatarAsync());
  }, [avatar, dispatch]);

  return (
    <IconButton color="inherit" onClick={onClick} ref={menuRef}>
      {avatar ? (
        <Avatar alt="avatar" src={avatar} className={classes.userProfileIcon} />
      ) : (
        <AccountIcon className={classes.userProfileIcon} />
      )}
    </IconButton>
  );
};

export { AvatarButton };
