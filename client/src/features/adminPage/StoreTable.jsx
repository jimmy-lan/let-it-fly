import React from "react";
import Table from "./table";
import axios from "axios";


const loadStoreTable = () => {
    return axios.get("/api/property/inventory").then(
        res => {
            const { body } = res.data;
            return {
                "data":
                    body.map(person => {
                        return {
                            ...person,
                            "name": person.name,
                            "description": person.description,
                            "price":person.price,
                            'category':person.category
                        }
                    })
            };
        }
    );
};




const StoreTable = () => (
  <Table
    columns={[
      { title: "ItemName", field: "name" },
      { title: "Description", field: "description" },
      { title: "Price", field: "price" },
        {title:"Category", field:"category"}
    ]}
    getData={loadStoreTable}
    title={"Store Info"}
  />
);

export default StoreTable;
