import React, { Component, useEffect } from "react";
import Table from "../table";
import { loadUsersTable } from "../../services/serverApi/userApi";
const UserTable1 = () => (
  <Table
    columns={[
      { title: "Nickname", field: "nickname" },
      { title: "Account Type", field: "accounttype" },
      { title: "Email", field: "email" },
      { title: "Name", field: "name" },
      { title: "Coins", filed: "coins", type: "numeric" },
    ]}
    getData={loadUsersTable()}
  />
);

export default UserTable1;
