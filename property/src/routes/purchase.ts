/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import express, { Request, Response } from "express";
import { param } from "express-validator";
import mongoose from "mongoose";
import {
  BadRequestError,
  StoreItemCategory,
  validateRequest,
} from "@ly-letitfly/common";
import { StoreItem, UserProperty } from "../models";
import { PropertyPurchaseMsgSender } from "../messages";
import { natsWrapper } from "../services";

const router = express.Router();

router.post(
  "/:itemId/purchase",
  [param("itemId").custom((id: string) => mongoose.Types.ObjectId.isValid(id))],
  validateRequest,
  async (req: Request, res: Response) => {
    const { itemId } = req.params;
    const userId = req.user!.id;

    const item = await StoreItem.findById(itemId);
    if (!item) {
      throw new BadRequestError("Item not found");
    }

    const property = await UserProperty.findById(userId);
    if (!property) {
      throw new BadRequestError(
        `User ${userId} does not have property entries. A message is probably missing.`
      );
    }

    // Do not allow duplicate purchases on some categories
    if (item.category === StoreItemCategory.paperCraneStyle) {
      if (property.paperCraneStyles.includes(item)) {
        throw new BadRequestError("You already own this paper crane style");
      }
    }

    // Check if user has sufficient fund to purchase this item
    if (property.coins < item.price) {
      throw new BadRequestError(
        "You do not have sufficient coins to purchase this item."
      );
    }

    switch (item.category) {
      case StoreItemCategory.paperCraneStyle:
        property.paperCraneStyles.push(item);
        await property.save();

        // Emit message
        await new PropertyPurchaseMsgSender(natsWrapper.client).send({
          itemValue: item.value,
          itemCategory: item.category,
          userId,
          __v: property.__v!,
        });
        break;

      // Currently, we do not have other categories of items
      default:
        await property.save();
    }

    return res.send({ success: true, data: property });
  }
);

export { router as purchaseRouter };
