/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-24
 * Description: Main frame for app pages.
 */

import React, { FunctionComponent, useState } from "react";
import clsx from "clsx";
import {
  AppBar,
  createStyles,
  Divider,
  Theme,
  Typography,
  Drawer,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
      marginRight: theme.spacing(3),
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    navShift: {
      width: `calc(100% - ${sideBarWidth}px`,
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
      transition: theme.transitions.create(
        "width" +
          {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.easeOut,
          }
      ),
    },
  })
);

const AppFrame: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [isExpanded, setExpanded] = useState(true);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.navShift]: isExpanded,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open side bar"
            edge="start"
            className={classes.appBarIconButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Let It Fly
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.sideBar, {
          [classes.compactSideBar]: !isExpanded,
          [classes.expandedSideBar]: isExpanded,
        })}
        // Override the default paper behaviour to
        // completely hide overflow
        classes={{
          paper: clsx({
            [classes.compactSideBar]: !isExpanded,
            [classes.expandedSideBar]: isExpanded,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton>
            <LeftArrowIcon />
          </IconButton>
        </div>
        <Divider />
      </Drawer>
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
      </main>
    </div>
  );
};

export { AppFrame };
