/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description:
 *    A route where the user must be authenticated to access. If the user is not authenticated
 *    and attempted to access this route, the user will be redirected.
 */

import React, { FunctionComponent, PropsWithChildren } from "react";
import { Route, RouteProps, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { useConfig } from "../../../config";
import { RootState } from "../../../app/store";

interface OwnProps extends RouteProps {
  /**
   * Route url to redirect user if user is not authenticated.
   * If this prop is specified, this prop will be used. If this
   * prop is empty, config.unauthRedirectRoute attribute will be
   * used.
   */
  redirectUrl?: string;
}

type Props = OwnProps;

/**
 * A route where the user must be authenticated to access.
 * @param children children to render
 * @param redirectUrl route url to redirect user if user is not authenticated
 */
const ProtectedRoute: FunctionComponent<Props> = ({
  children,
  redirectUrl,
  ...otherProps
}: PropsWithChildren<OwnProps>) => {
  const { email } = useSelector((state: RootState) => state.userAuth);
  // isAuthenticated is set to true when there is an auth cookie, false if otherwise.
  const isAuthenticated = !!email;

  const { location } = useHistory();
  const { unauthRedirectRoute } = useConfig();

  return (
    <Route {...otherProps}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: redirectUrl || unauthRedirectRoute,
            state: { from: location },
          }}
        />
      )}
    </Route>
  );
};

export { ProtectedRoute };
