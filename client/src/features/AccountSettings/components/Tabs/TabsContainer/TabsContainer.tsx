/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 * Description: Tabs container to contain tab panels.
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";

interface OwnProps {
  tabLabels: string[];
  /**
   * Index of the currently selected tab
   */
  selectedIndex: number;
  className?: string;
}

type Props = OwnProps;

const TabsContainer: FunctionComponent<Props> = ({
  tabLabels,
  selectedIndex,
  children,
  ...otherProps
}: PropsWithChildren<Props>) => {
  return (
    <Paper elevation={0} square {...otherProps}>
      <Tabs orientation="vertical" value={selectedIndex}>
        {tabLabels.map((tabLabel: string, index: number) => (
          <Tab label={tabLabel} value={index} />
        ))}
      </Tabs>
      {children}
    </Paper>
  );
};

export { TabsContainer };
