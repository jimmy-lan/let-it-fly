/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import { User } from "../models";
import { UserRole } from "@ly-letitfly/common";
import {
  AccountRoleUpdateUserMsgSender,
  AccountSignUpMsgSender,
} from "../messages/senders";
import { natsWrapper } from "./NatsWrapper";

const defaultUserAccounts = [
  {
    email: "admin@admin.com",
    password: "admin",
    role: UserRole.admin,
    firstName: "Admin",
    lastName: "User",
  },
  {
    email: "user@user.com",
    password: "user",
    role: UserRole.user,
    firstName: "William",
    lastName: "Joyce",
  },
];

/**
 * Utility service to perform operations on data.
 */
export class DataWorker {
  static onStart = async () => {
    console.log("[Data Worker] On instance start.");
    await DataWorker.ensureDefaultUserAccounts();
  };

  /**
   * Ensure that the default user accounts are in the database.
   */
  static ensureDefaultUserAccounts = async () => {
    console.log("[Data Worker] Checking default user accounts are created.");
    for (let userEntry of defaultUserAccounts) {
      const existingUser = await User.findOne({ email: userEntry.email });
      if (existingUser) {
        continue;
      }
      const { email, password, role, firstName, lastName } = userEntry;

      console.log(
        `[Data Worker] User with email ${email} was not found. Adding to database...`
      );

      try {
        const user = User.build({
          email,
          password,
          role,
          firstName,
          lastName,
        });
        await user.save();

        console.log(`[Data Worker] Added user ${email}. Emitting events...`);

        // Emit proper events
        await new AccountSignUpMsgSender(natsWrapper.client).send({
          id: user.id!,
          email,
        });

        await new AccountRoleUpdateUserMsgSender(natsWrapper.client).send({
          id: user.id!,
          firstName,
          lastName,
        });
      } catch (error) {
        console.error(error);
        throw new Error("Data worker failed to initialize data.");
      }
    }
    console.log("[Data Worker] ensureDefaultUserAccounts ran successfully.");
  };
}
