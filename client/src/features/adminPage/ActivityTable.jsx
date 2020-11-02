import React from 'react';
import Table from './table';
import { loadActivityTable } from '../../services/serverApi/userApi';
const ActivityTable = () => (
  <Table
    columns={[
      { title: 'Performed By', field: 'performedBy' },
      { title: 'Cescription', field: 'discription' },
      { title: 'Date', field: 'date' },
    ]}
    getData={loadActivityTable}
    title={"Activity Logs"}
  />
);

export default ActivityTable;
