/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import { Subjects } from "../Subjects";
import { Message } from "../Message";

/**
 * Indicates that user with <userId> deletes user with <friendId>
 * to his/her database entry. Does not indicate the reverse.
 */
export interface FriendDelete extends Message {
  subject: Subjects.FriendDelete;
  data: {
    userId: string;
    friendId: string;
    __v: number;
  };
}
