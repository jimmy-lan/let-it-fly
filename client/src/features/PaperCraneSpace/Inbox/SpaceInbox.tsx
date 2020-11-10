/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-05
 */
import React, { FunctionComponent, useState } from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";

import {
  fetchPaperCraneListShallow,
  MultiplePaperCraneResponse,
  PaperCraneInfo,
} from "../../../services/serverApi";
import { FeatureContainerWithHeader } from "../components/FeatureContainerWithHeader/FeatureContainerWithHeader";
import { InfiniteScrollList } from "../components/InfiniteScrollList/InfiniteScrollList";
import {
  Delete as DeleteIcon,
  Send as PaperCraneIcon,
  StarBorder as StarIcon,
} from "@material-ui/icons";

interface OwnProps {}

type Props = OwnProps;

const SpaceInbox: FunctionComponent<Props> = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<PaperCraneInfo[]>([]);

  const fetchNextData = async () => {
    const fetchCount = 10;

    const response: MultiplePaperCraneResponse = await fetchPaperCraneListShallow(
      fetchCount,
      list.length,
      "received"
    );

    // TODO check for failure

    setList((prevState: PaperCraneInfo[]) => prevState.concat(response.data!));

    if (!response.data?.length || response.data?.length < fetchCount) {
      setHasMore(false);
      return;
    }
  };

  return (
    <FeatureContainerWithHeader headerTitle="Inbox">
      <InfiniteScrollList
        hasMore={hasMore}
        loadMore={fetchNextData}
        useWindow={false}
      >
        {list.map((paperCrane: PaperCraneInfo, index: number) => (
          <ListItem button key={index}>
            <ListItemAvatar>
              <Avatar>
                <PaperCraneIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={paperCrane.title} />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <StarIcon />
              </IconButton>
              <IconButton edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </InfiniteScrollList>
    </FeatureContainerWithHeader>
  );
};

export { SpaceInbox };
