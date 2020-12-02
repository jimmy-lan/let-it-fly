/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import express from "express";

const router = express.Router();

router.post("/signout", (req, res) => {
  req.session = null;
  return res.send({ success: true });
});

export { router as signoutRouter };
