/**
 * Modified by Jimmy Lan to adapt to style convention on date
 * 2020-11-09
 */

import React, { FunctionComponent } from "react";
import { Button } from "@material-ui/core";
import { FeatureContainer, Link } from "../../common";

interface OwnProps {}

type Props = OwnProps;

const AdminHome: FunctionComponent<Props> = (props) => {
  return (
    <FeatureContainer fullHeight>
      <Link to="/my/users-table">
        <Button>User</Button>
      </Link>
      <Link to="/my/log-table">
        <Button>Activity</Button>
      </Link>
      <Link to="/my/cranes-table">
        <Button>Paper Cranes</Button>
      </Link>
      <Link to="/my/store-table">
        <Button>Style Store</Button>
      </Link>
    </FeatureContainer>
  );
};

export { AdminHome };
