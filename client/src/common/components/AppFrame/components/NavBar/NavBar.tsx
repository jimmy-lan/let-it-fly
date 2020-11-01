/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-01
 */
import React, { FunctionComponent } from "react";
import { IconButton, Toolbar, Typography, AppBar } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useStyles } from "./NavBar.style";
import clsx from "clsx";
import { UserToolBar } from "../UserToolBar/UserToolBar";

interface OwnProps {
  onMenuItemClick?: () => void;
  className?: string;
}

type Props = OwnProps;

const NavBar: FunctionComponent<Props> = ({ onMenuItemClick, className }) => {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.root, className)}
      data-test="component-app-bar"
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle side bar"
          edge="start"
          className={classes.navBarIconButton}
          onClick={onMenuItemClick}
          data-test="toggle-menu-button"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap data-test="component-app-header">
          Let It Fly
        </Typography>

        <div className={classes.grow} />

        <UserToolBar />
      </Toolbar>
    </AppBar>
  );
};

export { NavBar };
