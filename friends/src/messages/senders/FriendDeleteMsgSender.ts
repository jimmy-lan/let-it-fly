/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import { FriendDelete, MsgSender, Subjects } from "@ly-letitfly/common";

export class FriendDeleteMsgSender extends MsgSender<FriendDelete> {
  subject: Subjects.FriendDelete = Subjects.FriendDelete;
}
