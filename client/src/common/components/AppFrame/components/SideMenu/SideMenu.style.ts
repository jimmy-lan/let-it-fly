/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 */

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: theme.settings.sideBarWidth,
    },
    expandedSideBar: {
      width: theme.settings.sideBarWidth,
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
      paddingLeft: theme.spacing(3),
    },
    sideBarBottomTool: {
      justifyContent: "flex-end",
    },
    menuItem: {
      paddingLeft: theme.spacing(2.7),
      height: theme.spacing(9),
    },
    logo: { color: theme.palette.primary.main, marginRight: theme.spacing(3) },
    nameLabel: { fontWeight: "bold" },
  })
);
