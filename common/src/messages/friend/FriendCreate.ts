/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import { Message } from "../Message";
import { Subjects } from "../Subjects";

export interface FriendCreate extends Message {
  subject: Subjects.FriendCreate;
  data: {
    userId: string;
    friendId: string;
  };
}
