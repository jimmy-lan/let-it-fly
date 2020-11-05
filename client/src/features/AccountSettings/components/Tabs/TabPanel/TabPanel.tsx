/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 * Description:
 *    A tab panel displaying components corresponding to
 *    a specified tab.
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import { Box, Paper } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "./TabPanel.style";

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
  className,
  children,
  ...otherProps
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  return (
    <Paper
      elevation={0}
      square
      hidden={id !== displayId}
      className={clsx(classes.root, className)}
      {...otherProps}
    >
      {id === displayId && <Box>{children}</Box>}
    </Paper>
  );
};

export { TabPanel };
