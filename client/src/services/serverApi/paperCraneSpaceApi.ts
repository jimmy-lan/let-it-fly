/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-05
 * Description: Server APIs for paper crane space requests.
 */
import { ServerResponse } from "./models";

export interface PaperCraneInfo {
  title: string;
  content?: string;
  replies?: { sender: string; date: string; content: string }[];
  starred?: boolean;
  unread?: boolean;
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
  fetchCategory: "received" | "sent" | "starred"
) => {};
