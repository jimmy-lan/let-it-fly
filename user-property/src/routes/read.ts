/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { param } from "express-validator";
import {
  BadRequestError,
  ForbiddenError,
  UserRole,
  validateRequest,
} from "@ly-letitfly/common";
import { StoreItem, UserProperty } from "../models";

const router = express.Router();

const findUserProperty = async (userId: string) => {
  const property = await UserProperty.findById(userId);
  if (!property) {
    throw new BadRequestError(
      `User ${userId} does not have property entries. A message is probably missing.`
    );
  }
  return property;
};

/**
 * Get list of items owned by <userId>
 */
router.get(
  "/:userId/items",
  [param("userId").custom((id: string) => mongoose.Types.ObjectId.isValid(id))],
  validateRequest,
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (req.user!.role !== UserRole.admin && req.user!.id !== userId) {
      throw new ForbiddenError();
    }

    const property = await findUserProperty(req.user!.id);
    return res.send({ success: true, data: property });
  }
);

/**
 * Get list of items owned by the current user
 */
router.get("/items", async (req: Request, res: Response) => {
  const property = await findUserProperty(req.user!.id);
  return res.send({ success: true, data: property });
});

/**
 * Get store inventory.
 * Items that the current user owns will not be returned.
 * Always return all inventory when admin user calls this route.
 */
router.get("/inventory", async (req: Request, res: Response) => {
  const inventories = await StoreItem.find({});

  if (req.user!.role === UserRole.admin) {
    return res.send({ success: true, data: inventories });
  }

  const property = await findUserProperty(req.user!.id);
  const ownedInventoryIds = property.paperCraneStyles;

  const filteredInventories = inventories
    .map((inventory) => ({
      id: inventory.id,
      name: inventory.name,
      description: inventory.description,
      price: inventory.price,
    }))
    .filter((inventory) => !ownedInventoryIds.includes(inventory.id));

  return res.send({ success: true, data: filteredInventories });
});

export { router as readRouter };
