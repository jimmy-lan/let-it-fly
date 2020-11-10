import React from "react";
import UserStoreItem from "./UserStoreItem";
import { loadStoreContents } from "../../services/serverApi/userStoreApi";

const userStore = () => {
  return (
    <div>
      <UserStoreItem getData={loadStoreContents} />
    </div>
  );
};

export default userStore;
