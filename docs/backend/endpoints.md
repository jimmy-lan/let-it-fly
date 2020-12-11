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
- When working with our api backends, please ensure that the requests are sent
  using `https`, not `http`. We do **NOT** send cookies over `http` due to security
  reasons. If you are testing our app and sending your requests using `http` instead
  of `https`, the backend API won't issue you a cookie, so you will not
  be authenticated to use our backend services.
- We provide many testing files across different services. Most routes, especially
  some important routes that will be used by the user, are well tested. Please find
  these testing files under the folder `src/routes/__test__` for each available service. You can
  run these tests by running `npm run test` from **the folder for each service**, but
  **NOT** from the root project folder.

We will describe the available route names for each service below.

### Authentication Service

Route prefix: `/api/users`

#### Routes for Regular User

| Route Name     | Method | Short Description                               | Additional Information        |
| -------------- | ------ | ----------------------------------------------- | ----------------------------- |
| /signin        | POST   | Sign in user                                    | Req body: email, password     |
| /signup        | POST   | Sign up user                                    | Req body: email, password     |
| /current       | GET    | Get signed in user                              |                               |
| /roles/upgrade | POST   | Upgrade current user from guest to regular user | Req body: firstName, lastName |

#### Routes for Admin User

| Route Name            | Method | Short Description                | Additional Information               |
| --------------------- | ------ | -------------------------------- | ------------------------------------ |
| /                     | GET    | Get a list of users              | id, email, role, firstName, lastName |
| /roles/:userId/change | PATCH  | Update role for user with userId | Req body: role                       |

#### Notes for admin routes

By calling the "/" route with GET method, a list of user information with **only** id, email, role, first name, last name will be returned. For a more detailed list, please query the user profile service.

For the route "/roles/:userId/change" with PATCH method, please provide a "role" attribute in the request body. It should be one of "admin", "user", or "guest". Otherwise, a bad request error would be returned from the service.

#### Query Parameters

Please note that the admin GET route supports query parameters for pagination.
You can specify `skip` and `limit` query parameters for these routes. Namely, `limit` limits the number of entries
to return, `skip` determines the number of entries to skip.

### Profile Service

> Migrated: This service was originally named "user information service".

Route prefix: `/api/profiles`

<del>Route prefix: `/api/users/info`</del> (Deprecated, will remove before phase 2 submission. Please migrate your code!)

#### Routes for Regular User

| Route Name      | Method | Short Description                           | Additional Information |
| --------------- | ------ | ------------------------------------------- | ---------------------- |
| /data           | GET    | Get profile data of the signed in user      |                        |
| /:userId/data   | GET    | Get profile data of the user with userId    | Has permission checks  |
| /data           | PATCH  | Update profile data of the signed in user   | See model for req body |
| /:userId/data   | PATCH  | Update profile data of the user with userId | Has permission checks  |
| /avatar         | GET    | Get avatar of the signed in user            |                        |
| /:userId/avatar | GET    | Get avatar of the user with userId          | Has permission checks  |
| /avatar         | PATCH  | Upload avatar for the signed in user        |                        |
| /:userId/avatar | PATCH  | Upload avatar for the the user with userId  | Has permission checks  |

| WARNING: You will not be able to upload an avatar during your local testing. This is because the key file used to access GCS is ignored for security reasons. Please test the avatar upload functionality on the production API only. |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

#### Permission Checks

For the routes indicated to have permission checks above, different behaviour may occur depending on who sends the request. For example, for the patch route `/:userId/data`, if a regular user sends this patch request attempting to update the primary email (i.e. `contact.email.primary` is specified in the request body), this field will be ignored and not updated. However, if an admin user sends the same request, the primary email for the user **will** be modified.

Also, there are permission checks to ensure proper data access in these routes. For a regular user, we only allow access to profile information if either (1) the user is trying to access the profile for him/herself, or (2) the user is trying to access the profile of a friend. However, this is not the case for an admin user. An admin user can call the same route to access any user profile.

#### Routes for Admin User

| Route Name | Method | Short Description   | Additional Information             |
| ---------- | ------ | ------------------- | ---------------------------------- |
| /          | GET    | Get a list of users | Return a list of user profile info |

#### Query Parameters

Please note that the admin GET route supports query parameters for pagination.
You can specify `skip` and `limit` query parameters for these routes. Namely, `limit` limits the number of entries
to return, `skip` determines the number of entries to skip.

### Property Service

> Migrated: This service was originally named "user property service".

Route prefix: `/api/property`

<del>Route prefix: `/api/users/property`</del> (Deprecated, will remove before phase 2 submission. Please migrate your code!)

#### Routes for Regular User and Admin

| Route Name        | Method | Short Description                                     | Additional Information          |
| ----------------- | ------ | ----------------------------------------------------- | ------------------------------- |
| /:userId/items    | GET    | Get items owned by userId                             | Has permission checks           |
| /items            | GET    | Get items owned by signed in user                     |                                 |
| /items/coins      | GET    | Get coins owned by signed in user                     |                                 |
| /inventory        | GET    | Get list of inventory **NOT** owned by signed in user | Returns all inventory for admin |
| /:itemId/purchase | POST   | Purchase item with <itemId>                           |                                 |

#### Routes for Admin

| Route Name      | Method | Short Description   | Additional Information                              |
| --------------- | ------ | ------------------- | --------------------------------------------------- |
| /inventory      | POST   | Add an inventory    | Req body: name, description, value, price, category |
| /:itemId/change | PATCH  | Update an inventory | Req body: attributes of inventory, all optional     |
| /:itemId/delete | DELETE | Delete an inventory |                                                     |

### Paper Cranes Service

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

#### Routes for Admin User

| Route Name | Method | Short Description                        | Additional Information   |
| ---------- | ------ | ---------------------------------------- | ------------------------ |
| /          | GET    | Get a list of paper cranes in the system | Can use query parameters |

#### Note for Admin Routes

You may realize that some admin routes are identical to routes that a user may use. These routes behave differently depending on who sends the request to them.

### Friends Service

Route prefix: `/api/friends`

#### Routes for Regular User

| Route Name | Method | Short Description                                  | Additional Information |
| ---------- | ------ | -------------------------------------------------- | ---------------------- |
| /          | GET    | Get a list of friends for signed in user           |                        |
| /:userId   | GET    | Get a list of friends for user with userId         | Has permission checks  |
| /:friendId | DELETE | Delete friend with friendId for the signed in user |                        |

#### Query Parameters

Please note that the GET methods for routes `/` and `/userId` has pagination support. That is, you can add in
query parameters `limit` and `skip`.

#### Friend Deletion Note

When a user deletes a friend, the friend entry only disappears for the user performing this operation.
For the friend of the user (i.e. the other party with <friendId>), the user is still a friend.
**This is done on purpose** to prevent hurting people's feelings.
