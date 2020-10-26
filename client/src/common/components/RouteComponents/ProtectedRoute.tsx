/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description: A route where the user must be authenticated to access.
 */

import React, { FunctionComponent, PropsWithChildren } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../../app/store";
import { routeConfig } from "../../../config/routeConfig";

type Props = RouteProps;

const ProtectedRoute: FunctionComponent<Props> = ({
  children,
  ...otherProps
}: PropsWithChildren<RouteProps>) => {
  const token = useSelector((state: RootState) => state.userAuth.token);
  // isAuthenticated is set to true when there is a token, false if otherwise.
  const isAuthenticated = !!token;
  return (
    <Route {...otherProps}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={routeConfig.unauthRedirectRoute} />
      )}
    </Route>
  );
};

export { ProtectedRoute };
