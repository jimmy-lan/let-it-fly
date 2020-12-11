/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-01
 */
import React, { FunctionComponent } from "react";
import clsx from "clsx";
import { ChevronLeft as LeftArrowIcon } from "@material-ui/icons";
import { Divider, Drawer, IconButton } from "@material-ui/core";

import { SideMenuGreetingCard } from "./SideMenuGreetingCard";
import { SideMenuList } from "./SideMenuList";
import { SideBarState } from "../../../../../app/redux/appFrameSlice";
import { useStyles } from "./SideMenu.style";

interface OwnProps {
  className?: string;
  sideBarState: SideBarState;
  onCloseIconClick?: () => void;
}

type Props = OwnProps;

const SideMenu: FunctionComponent<Props> = ({
  className,
  sideBarState,
  onCloseIconClick,
}: Props) => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      open={false}
      className={clsx(className, classes.root, {
        [classes.expandedSideBar]: sideBarState === SideBarState.Expanded,
        [classes.compactSideBar]: sideBarState === SideBarState.Compacted,
        [classes.closedSideBar]: sideBarState === SideBarState.Closed,
      })}
      // Override the default paper behaviour to
      // completely hide overflow
      classes={{
        paper: clsx({
          [classes.expandedSideBar]: sideBarState === SideBarState.Expanded,
          [classes.compactSideBar]: sideBarState === SideBarState.Compacted,
          [classes.closedSideBar]: sideBarState === SideBarState.Closed,
        }),
      }}
      data-test="component-side-menu"
    >
      <div className={classes.sideBarContent}>
        <div>
          <SideMenuGreetingCard
            className={clsx(classes.sideBarTool, classes.sideBarTopTool)}
          />
          <Divider />
          <SideMenuList />
        </div>
        <div>
          <Divider />
          <div className={clsx(classes.sideBarTool, classes.sideBarBottomTool)}>
            <IconButton
              color="inherit"
              aria-label="close side bar"
              edge="start"
              onClick={onCloseIconClick}
              data-test="close-menu-button"
            >
              <LeftArrowIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export { SideMenu };
