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
import { useHistory } from "../../../hooks/useHistory";

interface OwnProps {}

type Props = OwnProps;

const SideMenuList: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
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

  const handleMenuItemClick = (url: string) => {
    history.push(url);
  };

  return (
    <List>
      {menuToRender.map(({ name, Icon, url }: SideMenuConfigEntry) => (
        <ListItem
          button
          className={classes.menuItem}
          key={`${name}${url}`}
          onClick={() => handleMenuItemClick(url)}
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export { SideMenuList };
