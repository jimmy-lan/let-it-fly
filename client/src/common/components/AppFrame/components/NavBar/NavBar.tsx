/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-01
 */
import React, { FunctionComponent } from "react";
import { IconButton, Toolbar, Typography, AppBar } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useStyles } from "./NavBar.style";

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
      className={className}
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
      </Toolbar>
    </AppBar>
  );
};

export { NavBar };
