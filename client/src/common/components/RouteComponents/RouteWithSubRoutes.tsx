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
  // Hotfix October 30, 2020
  // Ensure <children> inherit isProtected property from parent if none is specified
  const childrenToRender = children?.map((route) => {
    if (!route.isProtected) {
      route.isProtected = isProtected;
    }
    return route;
  });

  if (isProtected) {
    return (
      <ProtectedRoute path={path} exact={exact} redirectUrl={redirectUrl}>
        <Component routes={childrenToRender} />
      </ProtectedRoute>
    );
  } else {
    return (
      <PublicRoute path={path} exact={exact}>
        <Component routes={childrenToRender} />
      </PublicRoute>
    );
  }
};

export { RouteWithSubRoutes };
