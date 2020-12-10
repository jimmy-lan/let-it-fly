/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-06
 */

import mongoose from "mongoose";
import { Friend, User } from "../../models";

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
  try {
    await user2!.save();
  } catch (error) {}

  const savedUser = await User.findById(userId);

  // The second saving should have no effect on the user document
  expect(savedUser!.contact.email.secondary).toEqual("process111@user.com");
});

it("increases version number on user document", async () => {
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
  expect(user.__v).toEqual(0);

  await user.save();
  expect(user.__v).toEqual(1);

  await user.save();
  expect(user.__v).toEqual(2);
});

it("handles concurrency issues for friend mongoose document", async () => {
  // User information
  const userId1 = mongoose.Types.ObjectId().toHexString();
  const userId2 = mongoose.Types.ObjectId().toHexString();
  const userId3 = mongoose.Types.ObjectId().toHexString();

  // Build friend
  const friend = Friend.build({
    user: userId1,
  });
  await friend.save();

  // Simulate two processes performing update operation
  // on user models
  const friend1 = await Friend.findOne({ user: userId1 });
  friend1!.set({ friends: [...friend1!.friends, userId2] });
  const friend2 = await Friend.findOne({ user: userId1 });
  friend2!.set({ friends: [...friend2!.friends, userId3] });

  await friend1!.save();
  try {
    await friend2!.save();
  } catch (error) {}

  const savedFriend = await Friend.findOne({ user: userId1 });

  // The second saving should have no effect on the user document
  expect(savedFriend!.friends).toHaveLength(1);
  expect(savedFriend!.friends[0].toString()).toEqual(userId2);
});

it("increases version number on friend document", async () => {
  const userId1 = mongoose.Types.ObjectId().toHexString();
  const userId2 = mongoose.Types.ObjectId().toHexString();

  // Build friend
  const friend = Friend.build({ user: userId1, friends: [userId2] });
  await friend.save();
  expect(friend.__v).toEqual(0);

  await friend.save();
  expect(friend.__v).toEqual(1);

  await friend.save();
  expect(friend.__v).toEqual(2);
});
