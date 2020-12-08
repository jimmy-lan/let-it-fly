/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-02
 */

import { Message } from "../Message";
import { Subjects } from "../Subjects";

export interface AccountSignIn extends Message {
  subject: Subjects.AccountSignIn;
  data: {
    id: string;
    email: string;
  };
}
