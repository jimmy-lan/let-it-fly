/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 * Description:
 *    A tab panel displaying components corresponding to
 *    a specified tab.
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import { Paper } from "@material-ui/core";

interface OwnProps {
  /**
   * Id of the current tab panel
   */
  id: any;
  /**
   * Id of the panel that should be displayed
   */
  displayId: any;
  className?: string;
}

type Props = OwnProps;

const TabPanel: FunctionComponent<Props> = ({
  id,
  displayId,
  children,
  ...otherProps
}: PropsWithChildren<Props>) => {
  return (
    <Paper elevation={0} square hidden={id !== displayId} {...otherProps}>
      {id === displayId && children}
    </Paper>
  );
};

export { TabPanel };
