/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-02
 */

import { MsgSender } from "@ly-letitfly/common/build/models/MsgSender";
import { AccountSignUp, Subjects } from "@ly-letitfly/common/build/messages";

export class AccountSignUpMsgSender extends MsgSender<AccountSignUp> {
  subject: Subjects.AccountSignUp = Subjects.AccountSignUp;
}
