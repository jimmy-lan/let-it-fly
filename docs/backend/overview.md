## Service Overview

> Author: Jimmy Lan
>
> Date: 2020-12-09

The image below shows a brief overview of the deployed structure.

Note that we may add more services to this diagram in the future.

![service diagram](service-overview.jpg)

### Auth Service

The auth service is responsible for authenticating the user and managing
roles. The auth service is the only source of truth when it comes to
user authentication (issuance of token) and role management.

### User Information Service

This service is responsible for managing detailed information about a user.
This includes personal information, contact information, profile data, and
avatar of users.

### User Property Service

The user property service manages properties of the user. For example, the number
of coins that the user possess, and the types of paper crane styles that the user owns.
It is also responsible for storing information relating store inventories.

### Paper Crane Service

The paper crane service is responsible for handling user requests to send, search, and
reply to paper cranes.

### Friends Service

The friends service manages resources relating to friend relationships in our application.

### Client Service

A nginx instance serving the frontend application.
