/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress, List, Typography } from "@material-ui/core";
import { useStyles } from "./InfiniteScrollList.style";

interface OwnProps {
  hasMore: boolean;
  loadMore: () => void;
  useWindow?: boolean;
}

type Props = OwnProps;

const Loader: FunctionComponent<{}> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.messageContainer}>
      <CircularProgress size={18} className={classes.circularProgress} />
      <Typography variant="body1">Loading...</Typography>
    </div>
  );
};

const EndMessage: FunctionComponent<{}> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.messageContainer}>
      <Typography variant="body1">
        You have seen all entries! <span>😄</span>
      </Typography>
    </div>
  );
};

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
      >
        {children}
        {hasMore ? <Loader /> : <EndMessage />}
      </InfiniteScroll>
    </List>
  );
};

export { InfiniteScrollList };
