/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description:
 *    A list rendered based on configured routes.
 */
import React, { FunctionComponent } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useSideMenuConfig } from "../../../hooks/useConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  SideMenuConfigEntry,
  SideMenuConfigGroup,
} from "../../../config/sideMenuConfig";
import { Link } from "../RouteComponents";
import { useStyles } from "./SideMenuList.style";

interface OwnProps {}

type Props = OwnProps;

const SideMenuList: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const sideMenuConfig = useSideMenuConfig();
  const currentUserRole = useSelector(
    (state: RootState) => state.userAuth.role
  );
  const menuToRender: SideMenuConfigEntry[] | undefined = sideMenuConfig.find(
    (sideMenuConfigGroup: SideMenuConfigGroup) =>
      sideMenuConfigGroup.role === currentUserRole
  )?.menuItems;

  if (!menuToRender) {
    return <></>;
  }

  return (
    <List>
      {menuToRender.map(({ name, Icon, url }: SideMenuConfigEntry) => (
        <Link to={url}>
          <ListItem button className={classes.menuItem} key={`${name}${url}`}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export { SideMenuList };
