/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
import React, { FunctionComponent } from "react";
import { FeatureContainerWithHeader } from "../../common/components/FeatureContainerWithHeader/FeatureContainerWithHeader";
import { InfiniteScrollList } from "../../common/components/InfiniteScrollList/InfiniteScrollList";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import {
  AccountCircle as FriendIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { useStyles } from "./UserFriendPage.style";

interface OwnProps {}

type Props = OwnProps;

const UserFriendsPage: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <FeatureContainerWithHeader headerTitle="Friends" className={classes.root}>
      <InfiniteScrollList hasMore={false} loadMore={() => {}}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <FriendIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Friend" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </InfiniteScrollList>
    </FeatureContainerWithHeader>
  );
};

export { UserFriendsPage };
