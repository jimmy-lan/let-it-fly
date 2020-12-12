/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-05
 * Description: Server APIs for paper crane space requests.
 */
import { ServerResponse } from "./models";
import { axios } from "../axios";

export interface PaperCraneInfo {
  id: string;
  title: string;
  style: string;
  content?: string;
  replies?: {
    sender: string | { id: string; firstName: string; lastName: string };
    content: string;
    isWishToConnect: boolean;
  }[];
  isStarred?: boolean;
  isUnread?: boolean;
}

export interface SinglePaperCraneResponse extends ServerResponse {
  data?: PaperCraneInfo;
}

export interface MultiplePaperCraneResponse extends ServerResponse {
  data?: PaperCraneInfo[];
}

/**
 * Fetch a list of paper crane based on <fetchCategory>.
 * The returned list only contains basic information about paper crane
 * and does **NOT** include details such as **content** and **replies**.
 * @param limit maximum number of paper crane items to return
 * @param skip number of paper crane entries to skip. Used for lazy loading.
 *    Set to 0 for not skipping any items.
 * @param fetchCategory category of paper crane to fetch.
 */
export const fetchPaperCraneListShallow = (
  limit: number,
  skip: number,
  fetchCategory: "received" | "sent" | "starred" | "unread"
) => {
  return axios.get<MultiplePaperCraneResponse>(
    "/api/paper-cranes/" + fetchCategory,
    {
      params: { limit, skip },
    }
  );
};

export const fetchPaperCrane = (id: string) => {
  return axios.get("/api/paper-cranes/" + id + "/info");
};

export const markPaperCrane = (
  id: string,
  markings: { isUnread: boolean; isStarred: boolean }
) => {
  return axios.patch("/api/paper-cranes/" + id + "/marking", markings);
};

export const searchPaperCrane = () => {
  return axios.get("/api/paper-cranes");
};

export const composePaperCrane = (data: {
  title: string;
  content: string;
  style: string;
}) => {
  return axios.post("/api/paper-cranes", data);
};

export const deletePaperCrane = (id: string) => {
  return axios.delete("/api/paper-cranes/" + id + "/delete");
};

export const replyPaperCrane = (
  id: string,
  content: string,
  isWishToConnect: boolean
) => {
  return axios.post("/api/paper-cranes/" + id + "/reply", {
    content,
    isWishToConnect,
  });
};
