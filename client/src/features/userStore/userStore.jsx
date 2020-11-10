import React from "react";
import { myStyles } from "./storeStyle";
import UserStoreItem from "./UserStoreItem";
import { loadStoreContents } from "../../services/serverApi/userStoreApi";

const userStore = () => {
  const classes = myStyles();

  return (
    <div>
      <UserStoreItem getData={loadStoreContents} />
    </div>
  );
};

export default userStore;
