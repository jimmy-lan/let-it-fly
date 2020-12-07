/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import { Subjects } from "../Subjects";
import { Message } from "../Message";

export interface FriendDelete extends Message {
  subject: Subjects.FriendDelete;
  data: {
    userId: string;
    friend: string;
  };
}
