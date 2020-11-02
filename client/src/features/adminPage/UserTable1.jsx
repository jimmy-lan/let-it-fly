
import React, { Component, useEffect } from 'react';
import Table from './expandableTable';
import { loadUsersTable } from '../../services/serverApi/adminApi';
const UserTable = () => (
  <Table
    columns={[
      { title: 'Nickname', field: 'nickname' },
      { title: 'Account Type', field: 'accounttype' },
      { title: 'Email', field: 'email' },
      { title: 'Name', field: 'name' },
      { title: 'Coins', filed: 'coins', type: 'numeric' },
    ]}
    getData={loadUsersTable}
    title={"User Info"}
    detalicolumns={[
        {title:'Join Date',field: 'joindate'},
        {title:'Date Of Birth',field: 'dateofbirth'},
        {title:'Contact Information',field: 'contactinformation'},
    ]}
  />
);

export default UserTable;