/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import { Message } from "../Message";
import { Subjects } from "../Subjects";

/**
 * Indicates that user with <userId> adds user with <friendId>
 * to his/her database entry. Does not indicate the reverse.
 */
export interface FriendCreate extends Message {
  subject: Subjects.FriendCreate;
  data: {
    userId: string;
    friendId: string;
    __v: number;
  };
}
