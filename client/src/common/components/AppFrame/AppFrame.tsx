/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-24
 * Description:
 *    Main frame for app pages. This component includes the app bar and the
 *    side bar of the app. Anything passed as children to this component will be
 *    rendered inside the app frame (i.e. with menu on the left and app bar
 *    on the top).
 */

import React, { FunctionComponent, PropsWithChildren, useState } from "react";
import clsx from "clsx";
import {
  AppBar,
  Divider,
  Typography,
  Drawer,
  IconButton,
  Toolbar,
  Container,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ChevronLeft as LeftArrowIcon,
  Send as PaperCraneIcon,
} from "@material-ui/icons";

import { useStyles } from "./AppFrame.style";
import { RouteEntry } from "../../../routes";
import { useRenderRoutes } from "../../../hooks/useRenderRoutes";
import { SideMenuList } from "./components/SideMenuList";

interface OwnProps {
  routes: RouteEntry[];
}

type Props = OwnProps;

export enum SideBarState {
  Expanded,
  Compacted,
  Closed,
}

const AppFrame: FunctionComponent<Props> = ({
  children,
  routes,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  const [sideBarState, setSideBarState] = useState(SideBarState.Expanded);
  const { renderRoutes } = useRenderRoutes(routes);

  const handleMenuIconClicked = (): void => {
    sideBarState === SideBarState.Expanded
      ? setSideBarState(SideBarState.Compacted)
      : setSideBarState(SideBarState.Expanded);
  };

  const handleCloseIconClicked = (): void => {
    setSideBarState(SideBarState.Closed);
  };

  return (
    <div className={classes.root} data-test="component-app-frame">
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.navShift]: sideBarState === SideBarState.Expanded,
        })}
        data-test="component-app-bar"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle side bar"
            edge="start"
            className={classes.appBarIconButton}
            onClick={handleMenuIconClicked}
            data-test="toggle-menu-button"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap data-test="component-app-header">
            Let It Fly
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={false}
        className={clsx(classes.sideBar, {
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
            <div className={clsx(classes.sideBarTool, classes.sideBarTopTool)}>
              <PaperCraneIcon className={classes.logo} />
              <div>
                <Typography variant="subtitle2">Welcome,</Typography>
                <Typography variant="subtitle1" className={classes.nameLabel}>
                  William Joyce!
                </Typography>
              </div>
            </div>
            <Divider />
            <SideMenuList />
          </div>
          <div>
            <Divider />
            <div
              className={clsx(classes.sideBarTool, classes.sideBarBottomTool)}
            >
              <IconButton
                color="inherit"
                aria-label="close side bar"
                edge="start"
                onClick={handleCloseIconClicked}
                data-test="close-menu-button"
              >
                <LeftArrowIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </Drawer>
      <Container className={classes.main}>
        <div className={classes.belowAppBar} />
        {/*Render components inside frame*/}
        {children}
        {renderRoutes()}
      </Container>
    </div>
  );
};

export { AppFrame };
