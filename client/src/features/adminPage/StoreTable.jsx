import React from 'react';
import Table from '../table';
import { loadStoreTable } from '../../services/serverApi/userApi';
const StoreTable = () => (
  <Table
    columns={[
      { title: 'ItemID', field: 'itemId' },
      { title: 'Description', field: 'to' },
      { title: 'Price', field: 'title', type: 'numeric' },
    ]}
    getData={loadStoreTable}
    title={"Store Info"}
  />
);

export default StoreTable;
