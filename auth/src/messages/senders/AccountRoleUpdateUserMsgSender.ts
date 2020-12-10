/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import {
  AccountRoleUpdateUser,
  MsgSender,
  Subjects,
} from "@ly-letitfly/common";

export class AccountRoleUpdateUserMsgSender extends MsgSender<AccountRoleUpdateUser> {
  subject: AccountRoleUpdateUser["subject"] = Subjects.AccountUserRoleUpdate;
}
