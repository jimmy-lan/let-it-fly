/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
import React, { FunctionComponent } from "react";
import { usePaperCraneList } from "./hooks";
import { InfiniteScrollList } from "./components/InfiniteScrollList/InfiniteScrollList";
import { PaperCraneInfo } from "../../services/serverApi";
import { EmailStyledList } from "./components/EmailStyledList/EmailStyledList";
import { FeatureContainerWithHeader } from "./components/FeatureContainerWithHeader/FeatureContainerWithHeader";

interface OwnProps {}

type Props = OwnProps;

const SpaceSentPage: FunctionComponent<Props> = (props) => {
  const [list, hasMore, fetchNextData] = usePaperCraneList("sent");

  return (
    <FeatureContainerWithHeader headerTitle="Sent">
      <InfiniteScrollList
        hasMore={hasMore}
        loadMore={fetchNextData}
        useWindow={false}
      >
        {list.map((paperCrane: PaperCraneInfo, index: number) => (
          <EmailStyledList title={paperCrane.title} key={index} />
        ))}
      </InfiniteScrollList>
    </FeatureContainerWithHeader>
  );
};

export { SpaceSentPage };
