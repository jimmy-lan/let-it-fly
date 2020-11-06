import React, { useRef, useEffect } from "react";
import { Button } from "@material-ui/core";
import { myStyles } from "./storeStyle";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import UserStoreItem from "./UserStoreItem";
import { loadStoreContents } from "../../services/serverApi/userStoreApi";

// import { loadStoreContents } from "../../services/serverApi/userStoreApi";

const userStore = () => {
  const classes = myStyles();

  return (
    <div>
      <UserStoreItem getData={loadStoreContents} />
    </div>
  );
};

export default userStore;
