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
  List,
  ListItem,
  ListItemText,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Menu as MenuIcon,
  ChevronLeft as LeftArrowIcon,
} from "@material-ui/icons";

import { useStyles } from "./AppFrame.style";

interface OwnProps {}

type Props = OwnProps;

const AppFrame: FunctionComponent<Props> = ({
  children,
}: PropsWithChildren<Props>) => {
  enum SideBarState {
    Expanded,
    Compacted,
    Closed,
  }

  const classes = useStyles();
  const [sideBarState, setSideBarState] = useState(SideBarState.Expanded);

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
      <CssBaseline />
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
            <div
              className={clsx(classes.sideBarTool, classes.sideBarTopTool)}
            />

            {/*<List>*/}
            {/*  {[*/}
            {/*    "Inbox Inbox",*/}
            {/*    "Starred Starred",*/}
            {/*    "Send email Starred",*/}
            {/*    "Drafts Starred",*/}
            {/*  ].map((text, index) => (*/}
            {/*    <ListItem button key={text}>*/}
            {/*      <ListItemText primary={text} />*/}
            {/*    </ListItem>*/}
            {/*  ))}*/}
            {/*</List>*/}
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
      <main className={classes.main}>
        <div className={classes.belowAppBar} />
        {/*Render components inside frame*/}
        {children}
      </main>
    </div>
  );
};

export { AppFrame };
