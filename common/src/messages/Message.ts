/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-02
 * Description:
 *     A message interface representing messages used
 *     for inter-service communication.
 */

import { Subjects } from "./Subjects";

/**
 * A message used for inter-service communication.
 */
export interface Message {
  subject: Subjects;
  data: Object;
}
