import React from "react";
import Table from "./table";
import { loadStoreTable } from "../../services/serverApi/adminApi";
const StoreTable = () => (
  <Table
    columns={[
      { title: "ItemID", field: "itemID" },
      { title: "Description", field: "description" },
      { title: "Price", field: "price" },
    ]}
    getData={loadStoreTable}
    title={"Store Info"}
  />
);

export default StoreTable;
