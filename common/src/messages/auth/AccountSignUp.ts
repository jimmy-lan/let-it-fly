/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-02
 */

import { Message } from "../Message";
import { Subjects } from "../Subjects";

export interface AccountSignUp extends Message {
  subject: Subjects.AccountSignUp;
  data: {
    id: string;
    email: string;
  };
}
