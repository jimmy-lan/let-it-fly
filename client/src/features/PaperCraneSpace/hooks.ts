import { useState } from "react";
import {
  fetchPaperCraneListShallow,
  MultiplePaperCraneResponse,
  PaperCraneInfo,
} from "../../services/serverApi";

/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
export const usePaperCraneList = (
  fetchCategory: "received" | "sent" | "starred"
): [PaperCraneInfo[], boolean, () => Promise<void>] => {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [list, setList] = useState<PaperCraneInfo[]>([]);

  const fetchNextData = async () => {
    const fetchCount = 10;

    const response: MultiplePaperCraneResponse = await fetchPaperCraneListShallow(
      fetchCount,
      list.length,
      fetchCategory
    );

    // TODO check for failure

    setList((prevState: PaperCraneInfo[]) => prevState.concat(response.data!));

    if (!response.data?.length || response.data?.length < fetchCount) {
      setHasMore(false);
      return;
    }
  };

  return [list, hasMore, fetchNextData];
};
