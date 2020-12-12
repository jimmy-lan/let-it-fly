/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import { StoreItem } from "../models";
import { defaultUserProperties, StoreItemCategory } from "@ly-letitfly/common";

/**
 * Utility service to perform operations on data.
 */
export class DataWorker {
  static hasCompleted: boolean = false;

  static onStart = async () => {
    console.log("[Data Worker] On instance start.");
    await DataWorker.ensureDefaultStoreItem();
    DataWorker.hasCompleted = true;
  };

  /**
   * Ensure that the store item document contains default
   * items required by the common package
   */
  static ensureDefaultStoreItem = async () => {
    console.log(
      "[Data Worker] Checking default store items are added to database"
    );
    for (let styleItem of defaultUserProperties.paperCraneStyleItems) {
      const storeItem = await StoreItem.findOne({
        category: StoreItemCategory.paperCraneStyle,
        value: styleItem.value,
      });
      if (!storeItem) {
        const item = StoreItem.build(styleItem);
        await item.save();
      }
    }
    console.log("[Data Worker] ensureDefaultStoreItem ran successfully.");
  };
}
