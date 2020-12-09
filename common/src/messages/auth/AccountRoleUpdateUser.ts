/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-06
 * Description:
 *     Message emitted when role of a user account changes from
 *     "guest" to "user".
 */

import { Message } from "../Message";
import { Subjects } from "../Subjects";

export interface AccountRoleUpdateUser extends Message {
  subject: Subjects.AccountUserRoleUpdate;
  data: {
    id: string;
    firstName: string;
    lastName: string;
  };
}
