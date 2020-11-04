import React from 'react';
import Table from './CraneExpandable';
import { loadPaperCraneTable } from '../../services/serverApi/adminApi';
const PaperCraneTable = () => (
  <Table
    columns={[
      { title: 'From', field: 'from' },
      { title: 'To', field: 'to' },
      { title: 'Title', field: 'title' },
      { title: 'Date', field: 'date' },
    ]}
    getData={loadPaperCraneTable}
    title={"Paper Cranes"}
  />
);

export default PaperCraneTable;
