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
import { useRenderRoutes } from "../../../hooks/useRenderRoutes";

interface OwnProps {}

type Props = OwnProps;

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
