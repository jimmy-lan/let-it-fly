/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description:
 *    Main router for Let It Fly app which encapsulates logic relating to route rendering
 *    inside of the app. This container renders app frame for routes requiring it.
 */

import React, { FunctionComponent } from "react";

interface OwnProps {}

type Props = OwnProps;

const AppRouter: FunctionComponent<Props> = (props) => {
  return <div>App Container</div>;
};

export { AppRouter };
