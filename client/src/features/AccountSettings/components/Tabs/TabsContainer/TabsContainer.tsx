/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 * Description: Tabs container to contain tab panels.
 */
import React, {
  ChangeEvent,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "./TabsContainer.style";

interface OwnProps {
  tabLabels: string[];
  /**
   * Index of the currently selected tab
   */
  selectedIndex: number;
  onTabChange?: (event: ChangeEvent<{}>, nextIndex: number) => void;
  className?: string;
}

type Props = OwnProps;

const TabsContainer: FunctionComponent<Props> = ({
  tabLabels,
  selectedIndex,
  onTabChange,
  children,
  className,
  ...otherProps
}: PropsWithChildren<Props>) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={0}
      square
      className={clsx(classes.root, className)}
      {...otherProps}
    >
      <Tabs orientation="vertical" value={selectedIndex} onChange={onTabChange}>
        {tabLabels.map((tabLabel: string, index: number) => (
          <Tab label={tabLabel} value={index} />
        ))}
      </Tabs>
      {children}
    </Paper>
  );
};

export { TabsContainer };
