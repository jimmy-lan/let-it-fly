/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-29
 * Description:
 *    AppHome page for the app. This page can later be used as a landing page, but for
 *    now it redirects to "/my".
 */

import React, { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";

interface OwnProps {}

type Props = OwnProps;

const AppHome: FunctionComponent<Props> = (props) => {
  return <Redirect to="/my" />;
};

export { AppHome };
