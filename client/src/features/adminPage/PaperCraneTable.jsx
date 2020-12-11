import React from "react";
import Table from "./CraneExpandable";
import { loadPaperCraneTable } from "../../services/serverApi/adminApi";

const loadPaperCraneTable = () => {
  return axios.get("/api/paper-cranes").then(
      res => {
          const { body } = res.data;
          return {
              "data":
                  body.map(paper => {
                      return {
                          ...paper,
                          "title": paper.title,
                          "style": paper.style,
                          "content": paper.content,
                          "from": paper.senderId,
                      }
                  })
          };
      }
  );
};

const PaperCraneTable = () => (
  <Table
    columns={[
      { title: "From", field: "from" },
      { title: "To", field: "to" },
      { title: "Title", field: "title" },
      { title: "Date", field: "date" },
    ]}
    getData={loadPaperCraneTable}
    title={"Paper Cranes"}
  />
);

export default PaperCraneTable;
