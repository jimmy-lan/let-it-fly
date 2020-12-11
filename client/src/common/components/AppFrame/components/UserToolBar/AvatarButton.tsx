/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-11
 */

import React, { FunctionComponent, RefObject } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AccountCircleTwoTone as AccountIcon } from "@material-ui/icons";
import { useStyles } from "./UserToolBar.style";

interface OwnProps {
  onClick?: () => void;
  ref?: RefObject<HTMLButtonElement>;
}

type Props = OwnProps;

const AvatarButton: FunctionComponent<Props> = ({ onClick, ref }: Props) => {
  const classes = useStyles();

  return (
    <IconButton color="inherit" onClick={onClick} ref={ref}>
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
  );
};

export { AvatarButton };
