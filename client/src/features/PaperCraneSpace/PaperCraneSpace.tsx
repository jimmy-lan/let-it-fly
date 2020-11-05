/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 * Description:
 *    Paper crane space for regular users.
 *    Provide frame for pages in paper crane space.
 */
import React, { FunctionComponent } from "react";
import { RouteEntry } from "../../routes";

interface OwnProps {
  routes?: RouteEntry[];
}

type Props = OwnProps;

const PaperCraneSpace: FunctionComponent<Props> = (props) => {
  return <div>Paper crane space.</div>;
};

export { PaperCraneSpace };
