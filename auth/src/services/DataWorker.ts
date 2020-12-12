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

interface AccountEntry {
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

const defaultUserAccounts: AccountEntry[] = [
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

  private static registerAccountMessageEmission = (
    entry: AccountEntry,
    accountId: string
  ) => {
    // Wait a few seconds, allowing other services to start.
    // This is very hacky, but since the purpose of this function
    // is only to populate some initial values, we are okay with this for now.
    setTimeout(async () => {
      const { email } = entry;
      try {
        await new AccountSignUpMsgSender(natsWrapper.client).send({
          id: accountId,
          email,
        });
        console.log(
          `[Background Task] Emitted account sign up message for user ${accountId}.`
        );
      } catch (error) {
        console.error(error);
      }
    }, 11 * 1000);

    setTimeout(async () => {
      const { firstName, lastName } = entry;
      try {
        await new AccountRoleUpdateUserMsgSender(natsWrapper.client).send({
          id: accountId,
          firstName,
          lastName,
        });
        console.log(
          `[Background Task] Emitted account role update message for user ${accountId}.`
        );
      } catch (error) {
        console.error(error);
      }
    }, 12 * 1000);
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
        DataWorker.registerAccountMessageEmission(userEntry, user.id!);
      } catch (error) {
        console.error(error);
        throw new Error("Data worker failed to initialize data.");
      }
    }
    console.log("[Data Worker] ensureDefaultUserAccounts ran successfully.");
  };
}
