/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
import React, { FunctionComponent } from "react";
import { usePaperCraneList } from "./hooks";
import { InfiniteScrollList } from "../../../common/components/InfiniteScrollList/InfiniteScrollList";
import { PaperCraneInfo } from "../../../services/serverApi";
import { EmailStyledListItem } from "../components/EmailStyledListItem/EmailStyledListItem";
import { FeatureContainerWithHeader } from "../../../common/components/FeatureContainerWithHeader/FeatureContainerWithHeader";

interface OwnProps {}

type Props = OwnProps;

const SpaceStarredPage: FunctionComponent<Props> = (props) => {
  const [list, hasMore, fetchNextData] = usePaperCraneList("starred");

  return (
    <FeatureContainerWithHeader headerTitle="Starred">
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

export { SpaceStarredPage };
