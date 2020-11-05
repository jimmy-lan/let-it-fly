/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description:
 *    Main router component for Let It Fly app which encapsulates logic relating to route rendering
 *    inside of the app.
 */

import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { routes } from "../../../routes";

import { useRenderRoutes } from "../../../hooks/useRenderRoutes";

interface OwnProps {}

type Props = OwnProps;

const AppRouter: FunctionComponent<Props> = (props) => {
  const { renderRoutes } = useRenderRoutes(routes);

  return (
    <Router>
      <Switch>{renderRoutes()}</Switch>
    </Router>
  );
};

export { AppRouter };
