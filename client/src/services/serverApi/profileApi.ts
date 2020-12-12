/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-11
 */

import { ServerResponse } from "./models";
import { ProfilePayload } from "../../app/redux/userProfileSlice";
import { axios } from "../axios";

export interface ProfileResponse extends ServerResponse {
  data?: ProfilePayload;
}

export interface AvatarResponse extends ServerResponse {
  data?: string;
}

export const fetchAvatar = () => {
  return axios.get<AvatarResponse>("/api/profiles/avatar");
};
