## List of Endpoints

> Author: Jimmy Lan
>
> Date: 2020-12-09

| WARNING: Due to scope, we did not make a separate service for admin users (i.e. the management service). Instead, we add some temporary routes on other services to allow access for admin users. This is in no way a good practice, so please be aware that admin users can be calling routes "in a weired way" in order to update resources. |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |


### Before You Continue

Please note the following:

- When the user signs up initially, the user will be given the role `guest`.
  As a guest user, the user will not be able to access any services except the
  authentication service. i.e. A **Forbidden** Error will be returned if the user
  attempts to access other services while having a role of `guest`. The user **must**
  call the route `/api/users/roles/upgrade` and provide valid first and last name
  in order to upgrade the user role to `user`, which indicates a regular user.
- We provide many testing files across different services. Most routes, especially
  some important routes that will be used by the user, are well tested. Please find
  these testing files under the folder `src/routes/__test__` for each available service. You can
  run these tests by running `npm run test` from **the folder for each service**, but
  **NOT** from the root project folder.

We will describe the available route names for each service below.

### Authentication Service

Route prefix: `/api/users`

#### Routes for Regular User

| Route Name     | Method | Short Description                        | Additional Information        |
| -------------- | ------ | ---------------------------------------- | ----------------------------- |
| /signin        | POST   | Sign in user                             | Req body: email, password     |
| /signup        | POST   | Sign up user                             | Req body: email, password     |
| /current       | GET    | Get signed in user                       |                               |
| /roles/upgrade | GET    | Upgrade current user from guest to admin | Req body: firstName, lastName |

### User Information Service

Route prefix: `/api/users/info`

#### Routes for Regular User and Admin

| Route Name | Method | Short Description                  | Additional Information |
| ---------- | ------ | ---------------------------------- | ---------------------- |
| /          | GET    | Get info about signed in user      |                        |
| /:userId   | GET    | Get info about user with <userId>  | Has permission checks  |
| /          | PATCH  | Update info about signed in user   | See model for req body |
| /:userId   | PATCH  | Update info for user with <userId> | Has permission checks  |

### User Property Service

Route prefix: `/api/users/property`

#### Routes for Regular User and Admin

| Route Name        | Method | Short Description                                     | Additional Information          |
| ----------------- | ------ | ----------------------------------------------------- | ------------------------------- |
| /:userId/items    | GET    | Get items owned by <userId>                           | Has permission checks           |
| /items            | GET    | Get items owned by signed in user                     |                                 |
| /items/coins      | GET    | Get coins owned by signed in user                     |                                 |
| /inventory        | GET    | Get list of inventory **NOT** owned by signed in user | Returns all inventory for admin |
| /:itemId/purchase | POST   | Purchase item with <itemId>                           |                                 |

## Paper Cranes Service

Route prefix: `/api/paper-cranes`

#### Routes for Regular User

| Route Name    | Method | Short Description                        | Additional Information               |
| ------------- | ------ | ---------------------------------------- | ------------------------------------ |
| /             | GET    | Search for a random paper crane          | Can fail if pool has no paper cranes |
| /             | POST   | Compose a paper crane                    | Req body: title, content, style      |
| /sent         | GET    | Get a list of sent paper cranes          |                                      |
| /received     | GET    | Get a list of received paper cranes      |                                      |
| /starred      | GET    | Get a list of starred paper cranes       |                                      |
| /unread       | GET    | Get a list of unread paper cranes        |                                      |
| /:pId/info    | GET    | Get details of a paper crane (i.e. read) | pId is the paper crane id to read    |
| /:pId/reply   | POST   | Reply to a paper crane                   | Req body: content, isWishToConnect   |
| /:pId/marking | PATCH  | Change markings of a paper crane         | Req body: isUnread, isStarred        |
| /:pId/delete  | DELETE | Delete paper crane for signed in user    | pId is the paper crane id to delete  |

#### Query Parameters

Please note that routes `/sent`, `/received`, `/starred`, and `/read` support query parameters for pagination.
You can specify `skip` and `limit` query parameters for these routes. Namely, `limit` limits the number of entries
to return, `skip` determines the number of entries to skip.

## Friends Service

Route prefix: `/api/friends`

#### Routes for Regular User

| Route Name | Method | Short Description                                    | Additional Information |
| ---------- | ------ | ---------------------------------------------------- | ---------------------- |
| /          | GET    | Get a list of friends for signed in user             |                        |
| /:userId   | GET    | Get a list of friends for user with <userId>         | Has permission checks  |
| /:friendId | DELETE | Delete friend with <friendId> for the signed in user |                        |

### Query Parameters

Please note that the GET methods for routes `/` and `/userId` has pagination support. That is, you can add in
query parameters `limit` and `skip`.

### Friend Deletion Note

When a user deletes a friend, the friend entry only disappears for the user performing this operation.
For the friend of the user (i.e. the other party with <friendId>), the user is still a friend.
**This is done on purpose** to prevent hurting people's feelings.
