/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import { FriendCreate, MsgSender, Subjects } from "@ly-letitfly/common";

export class FriendCreateMsgSender extends MsgSender<FriendCreate> {
  subject: Subjects.FriendCreate = Subjects.FriendCreate;
}
