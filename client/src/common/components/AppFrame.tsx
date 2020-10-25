/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-24
 * Description: Main frame for app pages.
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

interface OwnProps {}

type Props = OwnProps;

const sideBarWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["margin", "width"], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    appBarIconButton: {
      marginRight: theme.spacing(2),
    },
    navShift: {
      width: `calc(100% - ${sideBarWidth}px)`,
      marginLeft: sideBarWidth,
      transition: theme.transitions.create(["margin", "width"], {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    main: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    sideBar: {
      width: sideBarWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    expandedSideBar: {
      width: sideBarWidth,
      transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    compactSideBar: {
      width: theme.spacing(9) + 1,
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    closedSideBar: {
      width: 0,
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    sideBarContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
    sideBarTool: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    sideBarTopTool: {
      justifyContent: "flex-start",
    },
    sideBarBottomTool: {
      justifyContent: "flex-end",
    },
    belowAppBar: {
      ...theme.mixins.toolbar,
    },
  })
);

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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.navShift]: sideBarState === SideBarState.Expanded,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle side bar"
            edge="start"
            className={classes.appBarIconButton}
            onClick={handleMenuIconClicked}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            <p>Let It Fly</p>
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
      >
        <div className={classes.sideBarContent}>
          <div>
            <div
              className={clsx(classes.sideBarTool, classes.sideBarTopTool)}
            ></div>

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
