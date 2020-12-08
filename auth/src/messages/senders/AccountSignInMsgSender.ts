/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-02
 */

import { AccountSignIn, Subjects, MsgSender } from "@ly-letitfly/common";

export class AccountSignInMsgSender extends MsgSender<AccountSignIn> {
  subject: Subjects.AccountSignIn = Subjects.AccountSignIn;
}
