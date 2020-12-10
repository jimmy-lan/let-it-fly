/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import {
  MsgSender,
  PaperCraneUserConnect,
  Subjects,
} from "@ly-letitfly/common";

export class PaperCraneConnectMsgSender extends MsgSender<PaperCraneUserConnect> {
  subject: PaperCraneUserConnect["subject"] = Subjects.PaperCraneUserConnect;
}
