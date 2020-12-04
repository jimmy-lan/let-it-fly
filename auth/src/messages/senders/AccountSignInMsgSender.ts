/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-02
 */

import { MsgSender } from "@ly-letitfly/common/build/models/MsgSender";
import { AccountSignIn, Subjects } from "@ly-letitfly/common/build/messages";

export class AccountSignInMsgSender extends MsgSender<AccountSignIn> {
  subject: Subjects.AccountSignIn = Subjects.AccountSignIn;
}
