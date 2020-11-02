/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-31
 * Description: Menu item for side menu.
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import { useRouteMatch } from "react-router-dom";
import { SideMenuConfigEntry } from "../../../../../config";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useStyles } from "./SideMenu.style";
import { useHistory } from "../../../../../hooks/useHistory";

type Props = SideMenuConfigEntry;

const SideMenuItem: FunctionComponent<Props> = ({
  name,
  url,
  Icon,
  size,
  highlightExact,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  const match = useRouteMatch({
    path: url,
    exact: highlightExact,
  });
  const history = useHistory();

  const handleMenuItemClick = (url: string) => {
    history.push(url);
  };

  return (
    <ListItem
      button
      selected={!!match}
      className={classes.menuItem}
      onClick={() => handleMenuItemClick(url)}
    >
      <ListItemIcon>
        <Icon style={{ fontSize: size }} />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export { SideMenuItem };
