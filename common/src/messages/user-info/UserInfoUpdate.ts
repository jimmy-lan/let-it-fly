/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-06
 * Description:
 *     Message sent when user information is updated.
 *     At the current stage, this message only contains
 *     the basic information about an user.
 */

import { Message } from "../Message";
import { Subjects } from "../Subjects";

export interface UserInfoUpdate extends Message {
  subject: Subjects.UserInfoUpdate;
  data: {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    __v: number;
  };
}
