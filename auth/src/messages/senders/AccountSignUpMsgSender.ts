/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-02
 */

import { AccountSignUp, Subjects, MsgSender } from "@ly-letitfly/common";

export class AccountSignUpMsgSender extends MsgSender<AccountSignUp> {
  subject: Subjects.AccountSignUp = Subjects.AccountSignUp;
}
