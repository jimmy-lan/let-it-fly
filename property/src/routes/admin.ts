/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-10
 */

import { body } from "express-validator";
import { validateRequest } from "@ly-letitfly/common";
import express, { Request, Response } from "express";
import { StoreItemCategory } from "../../../common/src/enums";
import { StoreItem } from "../models";
import { requireAdmin } from "../../../common/src/middlewares";

const router = express.Router();

/**
 * Add an inventory
 */
router.post(
  "/inventory",
  requireAdmin,
  [
    body("name").notEmpty(),
    body("description").notEmpty(),
    body("value").notEmpty(),
    body("price").notEmpty(),
    body("category").isIn(Object.values(StoreItemCategory)),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, description, value, price, category } = req.body;

    const storeItem = StoreItem.build({
      name,
      description,
      value,
      price,
      category,
    });

    await storeItem.save();

    return res.send({ success: true, data: storeItem });
  }
);

export { router as adminRouter };
