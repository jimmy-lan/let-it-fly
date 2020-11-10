/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-05
 */
import React, { FunctionComponent } from "react";

import { PaperCraneInfo } from "../../../services/serverApi";
import { FeatureContainerWithHeader } from "../components/FeatureContainerWithHeader/FeatureContainerWithHeader";
import { InfiniteScrollList } from "../components/InfiniteScrollList/InfiniteScrollList";
import { EmailStyledListItem } from "../components/EmailStyledListItem/EmailStyledListItem";
import { usePaperCraneList } from "./hooks";

interface OwnProps {}

type Props = OwnProps;

const SpaceInboxPage: FunctionComponent<Props> = (props) => {
  const [list, hasMore, fetchNextData] = usePaperCraneList("received");

  return (
    <FeatureContainerWithHeader headerTitle="Inbox">
      <InfiniteScrollList
        hasMore={hasMore}
        loadMore={fetchNextData}
        useWindow={false}
      >
        {list.map((paperCrane: PaperCraneInfo, index: number) => (
          <EmailStyledListItem title={paperCrane.title} key={index} />
        ))}
      </InfiniteScrollList>
    </FeatureContainerWithHeader>
  );
};

export { SpaceInboxPage };
