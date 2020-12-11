import React from "react";
import Table from "./UserExpandable";
import axios from "axios";

const loadUserTable = () => {
  return axios.get("/api/profiles").then((res) => {
    const { body } = res.data;
    return {
      data: body.map((person) => {
        return {
          ...person,
          lastname: person.personal.name.last,
          contactinformation:
            person.contact.telephone + "/n " + person.contact.socialMedia,
          id: person.id,
          nickname:
            person.personal.name.last + " " + person.personal.name.first,
          firstname: person.personal.name.first,
          name: person.personal.name.first + " " + person.personal.name.last,
          coins: "1000",
          joindate: person.dateJoined.toLocaleString(),
        };
      }),
    };
  });
};

// const updateUsersTable = (id, newData) => {
//     axios.patch("/asas", {
//         ...newData
//     })
// }

const UserTable = () => (
  <Table
    columns={[
      { title: "Nickname", field: "nickname" },
      { title: "Email", field: "email" },
      { title: "Name", field: "name" },
    ]}
    getData={loadUserTable}
    title={"User Info"}
  />
);

export default UserTable;
