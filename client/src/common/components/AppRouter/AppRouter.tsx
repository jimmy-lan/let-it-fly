/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description:
 *    Main router component for Let It Fly app which encapsulates logic relating to route rendering
 *    inside of the app.
 */

import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { RouteEntry } from "../../../routes";
import { useRoutes } from "../../../hooks/useRoutes";
import { RouteWithSubRoutes } from "../RouteComponents/RouteWithSubRoutes";

interface OwnProps {}

type Props = OwnProps;

const useRenderRoutes = () => ({
  renderRoutes: (routes: RouteEntry[]) => (
    <>
      {routes.map((route: RouteEntry) => (
        <RouteWithSubRoutes key={route.path} route={route} />
      ))}
    </>
  ),
});

const AppRouter: FunctionComponent<Props> = (props) => {
  const routes: RouteEntry[] = useRoutes();
  const { renderRoutes } = useRenderRoutes();

  return (
    <Router>
      <Switch>{renderRoutes(routes)}</Switch>
    </Router>
  );
};

export { AppRouter };
