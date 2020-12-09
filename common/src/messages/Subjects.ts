/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-02
 * Description: An enum listing possible subjects for messages.
 */

/**
 * An enum listing possible subjects for messages.
 * @see Message
 */
export enum Subjects {
  AccountSignUp = "account:signup",
  AccountSignIn = "account:signin",
  AccountUserRoleUpdate = "account:user-role-update",
  UserInfoUpdate = "user-info:update",
  PropertyPurchase = "property:purchase",
  PaperCraneUserConnect = "paper-crane:user-connect",
  FriendCreate = "friend:create",
  FriendDelete = "friend:deletes",
}
