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
  className?: string;
}

type Props = OwnProps;

const AvatarButton: FunctionComponent<Props> = ({
  avatarSrc,
  className,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <input
        accept="image/*"
        className={classes.imageInput}
        id="avatar-button-file"
        type="file"
      />
      <label htmlFor="avatar-button-file">
        <IconButton
          color="primary"
          component="span"
          className={classes.iconButton}
        >
          {avatarSrc ? (
            <Avatar src={avatarSrc} className={classes.icon} />
          ) : (
            <AccountIcon className={classes.icon} />
          )}
        </IconButton>
      </label>
    </div>
  );
};

export { AvatarButton };
