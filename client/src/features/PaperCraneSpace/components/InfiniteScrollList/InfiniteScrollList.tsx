/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { List } from "@material-ui/core";
import { useStyles } from "./InfiniteScrollList.style";

interface OwnProps {
  hasMore: boolean;
  loadMore: () => void;
  useWindow?: boolean;
}

type Props = OwnProps;

const InfiniteScrollList: FunctionComponent<Props> = ({
  hasMore,
  loadMore,
  useWindow,
  children,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <InfiniteScroll
        hasMore={hasMore}
        loadMore={loadMore}
        useWindow={useWindow}
        loader={<div>Loading...</div>}
      >
        {children}
        {!hasMore && <div>End of entries</div>}
      </InfiniteScroll>
    </List>
  );
};

export { InfiniteScrollList };
