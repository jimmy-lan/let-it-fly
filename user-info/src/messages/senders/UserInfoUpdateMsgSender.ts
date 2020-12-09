/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-06
 */

import { MsgSender, Subjects, UserInfoUpdate } from "@ly-letitfly/common";

export class UserInfoUpdateMsgSender extends MsgSender<UserInfoUpdate> {
  subject: Subjects.UserInfoUpdate = Subjects.UserInfoUpdate;
}
