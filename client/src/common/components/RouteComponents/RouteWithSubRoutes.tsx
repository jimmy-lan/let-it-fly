/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description: Helper route component for nested routes.
 */

import React, { FunctionComponent } from "react";
import { RouteEntry } from "../../../routes";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";

interface OwnProps {
  route: RouteEntry;
}

type Props = OwnProps;

const RouteWithSubRoutes: FunctionComponent<Props> = ({ route }: Props) => {
  const { path, exact, Component, isProtected, redirectUrl, children } = route;
  if (isProtected) {
    // @ts-ignore
    return (
      <ProtectedRoute path={path} exact={exact} redirectUrl={redirectUrl}>
        <Component routes={children} />
      </ProtectedRoute>
    );
  } else {
    return (
      <PublicRoute path={path} exact={exact}>
        <Component routes={children} />
      </PublicRoute>
    );
  }
};

export { RouteWithSubRoutes };
