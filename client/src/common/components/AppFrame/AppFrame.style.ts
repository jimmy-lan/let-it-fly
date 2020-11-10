/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-24
 */

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: "flex",
      height: "100vh",
      width: "100vw",
      [theme.breakpoints.up("sm")]: {
        overflowX: "hidden",
      },
    },
    navBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["margin", "width"], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    navShift: {
      width: `calc(100% - ${theme.settings.sideBarWidth}px)`,
      marginLeft: theme.settings.sideBarWidth,
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
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    belowAppBar: {
      ...theme.mixins.toolbar,
    },
  });
});
