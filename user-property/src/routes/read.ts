/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { param } from "express-validator";
import { UserRole, validateRequest } from "@ly-letitfly/common";
import { StoreItem } from "../models";

const router = express.Router();

/**
 * Get list of items owned by <userId>
 */
router.get(
  "/:userId/items",
  [param("userId").custom((id: string) => mongoose.Types.ObjectId.isValid(id))],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {}
);

/**
 * Get list of items owned by the current user
 */
router.get(
  "/items",
  [param("userId").custom((id: string) => mongoose.Types.ObjectId.isValid(id))],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {}
);

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
});

export { router as readRouter };
