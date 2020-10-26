/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 */

import { RouteEntry } from "../../routes";
import { RouteWithSubRoutes } from "../../common/components/RouteComponents/RouteWithSubRoutes";
import React from "react";

export const useRenderRoutes = () => ({
  renderRoutes: (routes: RouteEntry[]) => (
    <>
      {routes.map((route: RouteEntry) => (
        <RouteWithSubRoutes key={route.path} route={route} />
      ))}
    </>
  ),
});
