/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-06
 */

import mongoose from "mongoose";
import { User } from "../../models";

it("handles concurrency issues for user mongoose document", async () => {
  // User information
  const userId = mongoose.Types.ObjectId().toHexString();
  const userEmail = "user@user.com";

  // Build user
  const user = User.build({
    id: userId,
    contact: {
      email: {
        primary: userEmail,
      },
    },
  });
  await user.save();

  // Simulate two processes performing update operation
  // on user models
  const user1 = await User.findById(userId);
  user1!.set({ contact: { email: { secondary: "process111@user.com" } } });
  const user2 = await User.findById(userId);
  user2!.set({ contact: { email: { secondary: "process222@user.com" } } });

  await user1!.save();
  await user2!.save();
});
