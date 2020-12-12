import { useState } from "react";
import {
  fetchPaperCraneListShallow,
  MultiplePaperCraneResponse,
  PaperCraneInfo,
} from "../../../services/serverApi";
import { AxiosResponse } from "axios";

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

    let response: AxiosResponse<MultiplePaperCraneResponse>;

    try {
      response = await fetchPaperCraneListShallow(
        fetchCount,
        list.length,
        fetchCategory
      );
    } catch (error) {
      alert("Sorry, the paper crane service is currently unavailable.");
      console.log(error);
      setHasMore(false);
      return;
    }

    const body = response.data;

    setList((prevState: PaperCraneInfo[]) => prevState.concat(body.data!));

    if (!body.data?.length || body.data?.length < fetchCount) {
      setHasMore(false);
      return;
    }
  };

  return [list, hasMore, fetchNextData];
};
