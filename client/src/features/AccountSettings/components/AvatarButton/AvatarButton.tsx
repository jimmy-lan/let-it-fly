/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 * Description:
 *    An icon button containing an avatar image inside of it.
 *    When the button is clicked, user image uploads can be accepted.
 */
import React, { FunctionComponent } from "react";
import { useStyles } from "./AvatarButton.style";
import { Avatar, IconButton } from "@material-ui/core";
import { AccountCircle as AccountIcon } from "@material-ui/icons";

interface OwnProps {
  avatarSrc?: string;
}

type Props = OwnProps;

const AvatarButton: FunctionComponent<Props> = ({ avatarSrc }: Props) => {
  const classes = useStyles();
  return (
    <div>
      <input
        accept="image/*"
        className={classes.imageInput}
        id="icon-button-file"
        type="file"
      />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" component="span">
          {avatarSrc ? <Avatar src={avatarSrc} /> : <AccountIcon />}
        </IconButton>
      </label>
    </div>
  );
};

export { AvatarButton };
