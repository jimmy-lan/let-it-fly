/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-05
 */
import React, { FunctionComponent, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useStyles } from "./SpaceInbox.style";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  fetchPaperCraneListShallow,
  MultiplePaperCraneResponse,
  PaperCraneInfo,
} from "../../../services/serverApi";
import { FeatureContainer } from "../../../common/components/FeatureContainer";

interface OwnProps {}

type Props = OwnProps;

const SpaceInbox: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
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
    if (!response.data?.length || response.data?.length < fetchCount) {
      setHasMore(false);
      return;
    }

    setList((prevState: PaperCraneInfo[]) => prevState.concat(response.data!));
  };

  //@ts-ignore
  return (
    <FeatureContainer className={classes.root}>
      <div className={classes.header}>
        <Typography variant="subtitle1">Inbox</Typography>
      </div>

      <List className={classes.list}>
        <InfiniteScroll
          hasMore={hasMore}
          loadMore={fetchNextData}
          useWindow={false}
        >
          {list.map((paperCrane: PaperCraneInfo, index: number) => (
            <ListItem button key={index}>
              <ListItemText primary={paperCrane.title} />
            </ListItem>
          ))}
          {hasMore ? (
            <Button onClick={fetchNextData}>Load More</Button>
          ) : (
            <Typography variant="subtitle1">That's all!</Typography>
          )}
        </InfiniteScroll>
      </List>
    </FeatureContainer>
  );
};

export { SpaceInbox };
