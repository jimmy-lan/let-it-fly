/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-24
 * Description:
 *    Main frame for app pages. This component includes the app bar and the
 *    side bar of the app. Anything passed as children to this component will be
 *    rendered inside the app frame (i.e. with menu on the left and app bar
 *    on the top).
 */

import React, { FunctionComponent, PropsWithChildren } from "react";
import { Container } from "@material-ui/core";

import { useStyles } from "./AppFrame.style";
import { RouteEntry } from "../../../routes";
import { useRenderRoutes } from "../../../hooks/useRenderRoutes";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  SideBarState,
  setSideBarState,
} from "../../../app/redux/appFrameSlice";
import { NavBar } from "./components/NavBar/NavBar";
import clsx from "clsx";

interface OwnProps {
  routes: RouteEntry[];
}

type Props = OwnProps;

const AppFrame: FunctionComponent<Props> = ({
  children,
  routes,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sideBarState = useSelector(
    (state: RootState) => state.appFrame.sideBarState
  );
  const { renderRoutes } = useRenderRoutes(routes);

  const handleMenuIconClicked = (): void => {
    sideBarState === SideBarState.Expanded
      ? dispatch(setSideBarState(SideBarState.Compacted))
      : dispatch(setSideBarState(SideBarState.Expanded));
  };

  const handleCloseIconClicked = (): void => {
    dispatch(setSideBarState(SideBarState.Closed));
  };

  return (
    <div className={classes.root} data-test="component-app-frame">
      <NavBar
        className={clsx(classes.navBar, {
          [classes.navShift]: sideBarState === SideBarState.Expanded,
        })}
        onMenuItemClick={handleMenuIconClicked}
      />
      <SideMenu
        sideBarState={sideBarState}
        className={classes.sideBar}
        onCloseIconClick={handleCloseIconClicked}
      />
      <Container className={classes.main} maxWidth={false}>
        <div className={classes.belowAppBar} />
        {/*Render components inside frame*/}
        {children}
        {renderRoutes()}
      </Container>
    </div>
  );
};

export { AppFrame };
