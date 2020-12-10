/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-06
 */

import { Message } from "../Message";
import { Subjects } from "../Subjects";

export interface PaperCraneUserConnect extends Message {
  subject: Subjects.PaperCraneUserConnect;
  data: {
    /**
     * Array of user ids with length 2.
     */
    users: string[];
  };
}
