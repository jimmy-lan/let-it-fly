/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-24
 */

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) => {
  // Side bar width when fully expanded
  const sideBarWidth = 240;

  return createStyles({
    root: {
      display: "flex",
      height: "100vh",
      width: "100vw",
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
      flex: 1,
      background: theme.palette.greyBackground.light,
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
      paddingLeft: theme.spacing(3),
    },
    logo: {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(3),
    },
    nameLabel: {
      fontWeight: "bold",
    },
    sideBarBottomTool: {
      justifyContent: "flex-end",
    },
    belowAppBar: {
      ...theme.mixins.toolbar,
    },
  });
});
