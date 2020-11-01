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
} from "@material-ui/icons";

import { useStyles } from "./AppFrame.style";
import { RouteEntry } from "../../../routes";
import { useRenderRoutes } from "../../../hooks/useRenderRoutes";
import { SideMenuList } from "./components/SideMenu/SideMenuList";
import { SideMenuGreetingCard } from "./components/SideMenu/SideMenuGreetingCard";
import { SideMenu } from "./components/SideMenu/SideMenu";

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
      <SideMenu
        sideBarState={sideBarState}
        className={classes.sideBar}
        onCloseIconClick={handleCloseIconClicked}
      />
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
