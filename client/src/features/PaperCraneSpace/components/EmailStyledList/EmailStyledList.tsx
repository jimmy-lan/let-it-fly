/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 * Description: Email styled list used for paper crane space.
 */
import React, { FunctionComponent } from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Send as PaperCraneIcon,
  StarBorder as StarIcon,
} from "@material-ui/icons";

interface OwnProps {
  key?: any;
  title: string;
  onClick?: () => void;
  handleDeleteClick?: () => void;
  handleStarClick?: () => void;
}

type Props = OwnProps;

const EmailStyledList: FunctionComponent<Props> = ({
  key,
  title,
  onClick,
  handleDeleteClick,
  handleStarClick,
}: Props) => {
  return (
    <ListItem button onClick={onClick} key={key}>
      <ListItemAvatar>
        <Avatar>
          <PaperCraneIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleDeleteClick}>
          <StarIcon />
        </IconButton>
        <IconButton edge="end" onClick={handleStarClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export { EmailStyledList };
