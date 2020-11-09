import React, { FunctionComponent } from "react";
import { Button } from "@material-ui/core";
import { Link } from "../../common";

interface OwnProps {}

type Props = OwnProps;

const AdminHome: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <Link to="/my/usersTable">
        <Button>User</Button>
      </Link>
      <Link to="/my/logTable">
        <Button>Activity</Button>
      </Link>
      <Link to="/my/cranesTable">
        <Button>Paper Cranes</Button>
      </Link>
      <Link to="/my/storeTable">
        <Button>Style Store</Button>
      </Link>
    </div>
  );
};

export { AdminHome };
