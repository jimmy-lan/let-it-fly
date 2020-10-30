/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 */

import { RouteEntry } from "../../routes";
import { RouteWithSubRoutes } from "../../common/components/RouteComponents/RouteWithSubRoutes";
import React from "react";
import { useRoutes } from "../useRoutes";

export const useRenderRoutes = (routes: RouteEntry[] = []) => {
  const processedRoutes = useRoutes(routes);

  return {
    renderRoutes: () => (
      <>
        {processedRoutes.map((route: RouteEntry) => (
          <RouteWithSubRoutes key={route.path} route={route} />
        ))}
      </>
    ),
  };
};
