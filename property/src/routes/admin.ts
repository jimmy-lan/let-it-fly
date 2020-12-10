/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-10
 */

import { param, body } from "express-validator";
import {
  validateRequest,
  requireAdmin,
  StoreItemCategory,
  BadRequestError,
} from "@ly-letitfly/common";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { StoreItem } from "../models";

const router = express.Router();

router.use(requireAdmin);

/**
 * Add an inventory
 */
router.post(
  "/inventory",
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

/**
 * Update item with <itemId> in inventory
 */
router.patch(
  "/:itemId/change",
  [
    param("itemId").custom((id: string) => mongoose.Types.ObjectId.isValid(id)),
    body("category").optional().isIn(Object.values(StoreItemCategory)),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { itemId } = req.params;

    const storeItem = await StoreItem.findById(itemId);

    if (!storeItem) {
      throw new BadRequestError(`Store does not have item with id ${itemId}`);
    }

    storeItem.set(req.body);
    await storeItem.save();

    return res.send({ success: true, data: storeItem });
  }
);

router.delete(
  "/:itemId/delete",
  [param("itemId").custom((id: string) => mongoose.Types.ObjectId.isValid(id))],
  validateRequest,
  async (req: Request, res: Response) => {
    const { itemId } = req.params;

    const storeItem = await StoreItem.findById(itemId);

    if (!storeItem) {
      throw new BadRequestError(`Store does not have item with id ${itemId}`);
    }

    await storeItem.delete();

    return res.send({ success: true, data: storeItem });
  }
);

export { router as adminRouter };
