/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-09
 * Description: Google cloud storage service.
 */

import { Storage } from "@google-cloud/storage";
import path from "path";

const serviceKey = path.join(
  __dirname,
  "./let-it-fly-298204-32f4ad372cbd.json"
);

export const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "let-it-fly-298204",
});
